var app = angular.module('patientExaminationSystem', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/login.html',
            controller: 'LoginController'
        })
        .when('/dashboard', {
            templateUrl: 'app/views/dashboard.html',
            controller: 'DashboardController'
        })
        .when('/patients', {
            templateUrl: 'app/views/patients.html',
            controller: 'PatientsController'
        })
        .when('/examinations', {
            templateUrl: 'app/views/examinations.html',
            controller: 'ExaminationsController'
        })
        .otherwise({ redirectTo: '/' });
});

// Authentication check on route changes
app.run(function($rootScope, AuthService, $location) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (next.originalPath !== '/' && !AuthService.isAuthenticated()) {
            console.log('User not authenticated, redirecting to login');
            $location.path('/');
        }
    });
});

