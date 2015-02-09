'use strict';

module.exports = angular.module('pickemServices', [])
.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
        console.log('not authenticated');
      }
      return response || $q.when(response);
    }
  };
})
.factory('Authentication', function ($http, $window, API_URL) {
  var Authentication = {};

  Authentication.getToken = function (params) {
    return $http.post(API_URL + '/tokens', params);
  };

  Authentication.getUserFromToken = function () {
    return $http.get(API_URL + '/users/current');
  };

  Authentication.getCurrentUser = function () {
    try {
      if ($window.sessionStorage.currentUser) {
        return JSON.parse($window.sessionStorage.currentUser);
      } else {
        return null;
      }
    } catch (ex) {
      return null;
    }
  };

  Authentication.setCurrentUser = function (user) {
    if (user) {
      Authentication.currentUser = user;
      $window.sessionStorage.currentUser = JSON.stringify(user);
    } else {
      delete Authentication.currentUser;
      delete $window.sessionStorage.currentUser;
    }
  };

  return Authentication;
});
