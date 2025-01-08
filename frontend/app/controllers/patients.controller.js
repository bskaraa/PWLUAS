app.controller('PatientsController', function($scope, $location, AuthService, PatientService) {
    // Check authentication
    if (!AuthService.isAuthenticated()) {
        $location.path('/');
        return;
    }

    $scope.patients = [];
    $scope.newPatient = {
        name: '',
        dob: new Date(),
        gender: 'other'
    };
    $scope.editingPatient = null;
    $scope.loading = true;
    $scope.error = null;

    // Gender options
    $scope.genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' }
    ];

    function loadPatients() {
        $scope.loading = true;
        $scope.error = null;
        
        console.log('Loading patients...');
        PatientService.getAllPatients()
            .then(function(patients) {
                console.log('Patients loaded:', patients);
                $scope.patients = patients;
                $scope.loading = false;
            })
            .catch(function(error) {
                console.error('Error loading patients:', error);
                $scope.error = 'Error loading patients. Please try again.';
                $scope.loading = false;
            });
    }

    $scope.addPatient = function(form) {
        if (!form.$valid) {
            console.log('Form is invalid');
            return;
        }

        $scope.loading = true;
        $scope.error = null;

        console.log('Adding patient:', $scope.newPatient);
        
        PatientService.createPatient($scope.newPatient)
            .then(function(response) {
                console.log('Patient added successfully:', response);
                loadPatients();
                // Reset form
                $scope.newPatient = {
                    name: '',
                    dob: new Date(),
                    gender: 'other'
                };
                form.$setPristine();
                form.$setUntouched();
                // Close modal
                var modal = bootstrap.Modal.getInstance(document.getElementById('addPatientModal'));
                if (modal) {
                    modal.hide();
                }
            })
            .catch(function(error) {
                console.error('Error adding patient:', error);
                $scope.error = 'Error adding patient. Please try again.';
                $scope.loading = false;
            });
    };

    $scope.editPatient = function(patient) {
        $scope.editingPatient = angular.copy(patient);
        // Convert string date to Date object
        $scope.editingPatient.dob = new Date($scope.editingPatient.dob);
        var modal = new bootstrap.Modal(document.getElementById('editPatientModal'));
        modal.show();
    };

    $scope.updatePatient = function(form) {
        if (!form.$valid) {
            return;
        }

        $scope.loading = true;
        $scope.error = null;

        console.log('Updating patient:', $scope.editingPatient);
        PatientService.updatePatient($scope.editingPatient.id, $scope.editingPatient)
            .then(function(response) {
                console.log('Patient updated successfully:', response);
                loadPatients();
                $scope.editingPatient = null;
                var modal = bootstrap.Modal.getInstance(document.getElementById('editPatientModal'));
                if (modal) {
                    modal.hide();
                }
            })
            .catch(function(error) {
                console.error('Error updating patient:', error);
                $scope.error = 'Error updating patient. Please try again.';
                $scope.loading = false;
            });
    };

    $scope.deletePatient = function(patientId) {
        if (!confirm('Are you sure you want to delete this patient?')) {
            return;
        }

        $scope.loading = true;
        $scope.error = null;

        console.log('Deleting patient:', patientId);
        PatientService.deletePatient(patientId)
            .then(function(response) {
                console.log('Patient deleted successfully:', response);
                loadPatients();
            })
            .catch(function(error) {
                console.error('Error deleting patient:', error);
                $scope.error = 'Error deleting patient. Please try again.';
                $scope.loading = false;
            });
    };

    // Load patients when controller initializes
    loadPatients();
});

