app.controller('DashboardController', function($scope, $location, AuthService, PatientService, ExaminationService) {
    // Check authentication
    if (!AuthService.isAuthenticated()) {
        $location.path('/');
        return;
    }

    // Initialize with default values
    $scope.patientCount = 0;
    $scope.examinationCount = 0;

    // Function to load dashboard data
    function loadDashboardData() {
        // Load patients count
        PatientService.getAllPatients()
            .then(function(patients) {
                $scope.patientCount = patients.length;
                console.log('Patients loaded:', patients.length);
            })
            .catch(function(error) {
                console.error('Error loading patients:', error);
                $scope.patientCount = 0;
            });

        // Load examinations count
        ExaminationService.getAllExaminations()
            .then(function(examinations) {
                $scope.examinationCount = examinations.length;
                console.log('Examinations loaded:', examinations.length);
            })
            .catch(function(error) {
                console.error('Error loading examinations:', error);
                $scope.examinationCount = 0;
            });
    }

    // Load data immediately
    loadDashboardData();

    // Logout function
    $scope.logout = function() {
        AuthService.logout();
        $location.path('/');
    };
});

