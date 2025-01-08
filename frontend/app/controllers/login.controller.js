app.controller('LoginController', function($scope, $location, AuthService) {
  $scope.user = {
      username: '',
      password: ''
  };
  
  $scope.error = null;
  $scope.isLoading = false;

  $scope.login = function() {
      $scope.isLoading = true;
      $scope.error = null;

      AuthService.login($scope.user)
          .then(function() {
              $location.path('/dashboard');
          })
          .catch(function(error) {
              $scope.error = error.data.message || 'Username atau password salah';
          })
          .finally(function() {
              $scope.isLoading = false;
          });
  };
});

