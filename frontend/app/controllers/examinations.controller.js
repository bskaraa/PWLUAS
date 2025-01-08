app.controller('ExaminationsController', function($scope, $location, AuthService, ExaminationService, PatientService) {
  if (!AuthService.isAuthenticated()) {
      $location.path('/');
      return;
  }

  $scope.examinations = [];
  $scope.patients = [];
  $scope.newExamination = {};
  $scope.editingExamination = null;

  function loadExaminations() {
      ExaminationService.getAllExaminations()
          .then(function(examinations) {
              $scope.examinations = examinations;
          })
          .catch(function(error) {
              console.error('Error loading examinations:', error);
          });
  }

  function loadPatients() {
      PatientService.getAllPatients()
          .then(function(patients) {
              $scope.patients = patients;
          })
          .catch(function(error) {
              console.error('Error loading patients:', error);
          });
  }

  $scope.addExamination = function() {
      ExaminationService.createExamination($scope.newExamination)
          .then(function() {
              loadExaminations();
              $scope.newExamination = {};
              $('#addExaminationModal').modal('hide');
          })
          .catch(function(error) {
              console.error('Error adding examination:', error);
          });
  };

  $scope.editExamination = function(examination) {
      $scope.editingExamination = angular.copy(examination);
      $('#editExaminationModal').modal('show');
  };

  $scope.updateExamination = function() {
      ExaminationService.updateExamination($scope.editingExamination.id, $scope.editingExamination)
          .then(function() {
              loadExaminations();
              $scope.editingExamination = null;
              $('#editExaminationModal').modal('hide');
          })
          .catch(function(error) {
              console.error('Error updating examination:', error);
          });
  };

  $scope.deleteExamination = function(examinationId) {
      if (confirm('Are you sure you want to delete this examination?')) {
          ExaminationService.deleteExamination(examinationId)
              .then(function() {
                  loadExaminations();
              })
              .catch(function(error) {
                  console.error('Error deleting examination:', error);
              });
      }
  };

  loadExaminations();
  loadPatients();
});

