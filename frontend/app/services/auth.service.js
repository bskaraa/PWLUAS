app.service('AuthService', function($http) {
    const API_URL = 'http://localhost:3000/api';

    this.login = function(credentials) {
        return $http.post(`${API_URL}/auth/login`, credentials)
            .then(function(response) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                return response.data;
            });
    };

    this.logout = function() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    this.isAuthenticated = function() {
        return !!localStorage.getItem('token');
    };

    this.getToken = function() {
        return localStorage.getItem('token');
    };

    this.getUser = function() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    };
});

