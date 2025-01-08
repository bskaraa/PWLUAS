app.service('ExaminationService', function($http, AuthService) {
  const API_URL = 'http://localhost:3000/api';

  this.getAllExaminations = function() {
      return $http.get(`${API_URL}/examinations`, {
          headers: { 'Authorization': 'Bearer ' + AuthService.getToken() }
      }).then(function(response) {
          return response.data;
      });
  };

  this.createExamination = function(examination) {
      return $http.post(`${API_URL}/examinations`, examination, {
          headers: { 'Authorization': 'Bearer ' + AuthService.getToken() }
      }).then(function(response) {
          return response.data;
      });
  };

  this.updateExamination = function(id, examination) {
      return $http.put(`${API_URL}/examinations/${id}`, examination, {
          headers: { 'Authorization': 'Bearer ' + AuthService.getToken() }
      }).then(function(response) {
          return response.data;
      });
  };

  this.deleteExamination = function(id) {
      return $http.delete(`${API_URL}/examinations/${id}`, {
          headers: { 'Authorization': 'Bearer ' + AuthService.getToken() }
      }).then(function(response) {
          return response.data;
      });
  };
});

