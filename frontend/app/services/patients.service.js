app.service('PatientService', function($http, AuthService) {
  const API_URL = 'http://localhost:3000/api';

  this.getAllPatients = function() {
      return $http.get(`${API_URL}/patients`, {
          headers: { 'Authorization': 'Bearer ' + AuthService.getToken() }
      })
      .then(function(response) {
          console.log('GET patients response:', response);
          return response.data;
      })
      .catch(function(error) {
          console.error('GET patients error:', error);
          throw error;
      });
  };

  this.getPatient = function(id) {
      return $http.get(`${API_URL}/patients/${id}`, {
          headers: { 'Authorization': 'Bearer ' + AuthService.getToken() }
      })
      .then(function(response) {
          return response.data;
      });
  };

  this.createPatient = function(patientData) {
      // Ensure date is in correct format
      if (patientData.dob instanceof Date) {
          patientData.dob = patientData.dob.toISOString().split('T')[0];
      }

      // Add default gender if not provided
      if (!patientData.gender) {
          patientData.gender = 'other';
      }
      
      console.log('Creating patient with data:', patientData);
      
      return $http.post(`${API_URL}/patients`, patientData, {
          headers: { 'Authorization': 'Bearer ' + AuthService.getToken() }
      })
      .then(function(response) {
          console.log('POST patient response:', response);
          return response.data;
      })
      .catch(function(error) {
          console.error('POST patient error:', error);
          throw error;
      });
  };

  this.updatePatient = function(id, patientData) {
      // Ensure date is in correct format
      if (patientData.dob instanceof Date) {
          patientData.dob = patientData.dob.toISOString().split('T')[0];
      }
      
      return $http.put(`${API_URL}/patients/${id}`, patientData, {
          headers: { 'Authorization': 'Bearer ' + AuthService.getToken() }
      })
      .then(function(response) {
          console.log('PUT patient response:', response);
          return response.data;
      })
      .catch(function(error) {
          console.error('PUT patient error:', error);
          throw error;
      });
  };

  this.deletePatient = function(id) {
      return $http.delete(`${API_URL}/patients/${id}`, {
          headers: { 'Authorization': 'Bearer ' + AuthService.getToken() }
      })
      .then(function(response) {
          console.log('DELETE patient response:', response);
          return response.data;
      })
      .catch(function(error) {
          console.error('DELETE patient error:', error);
          throw error;
      });
  };
});

