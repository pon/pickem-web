'use strict';

require('./directives');
require('./filters');
require('./services');

var lob = angular.module('pickem', [
  'angular-flash.flash-alert-directive',
  'angular-flash.service',
  'pickemDirectives',
  'pickemFilters',
  'pickemServices',
  'pickemConfig',
  'ui.bootstrap',
  'ui.router'
])
.controller('AuthenticationCtrl', require('./controllers/authenticationCtrl'))
.controller('HomeCtrl', require('./controllers/homeCtrl'))
.config(function ($httpProvider, $locationProvider, $stateProvider,
    $urlRouterProvider, flashProvider) {

  flashProvider.errorClassnames.push('alert-danger');
  // Add interceptor to add JWT header
  $httpProvider.interceptors.push('authInterceptor');

  $locationProvider.html5Mode(true);

  // Redirect any unmatched route to landing
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('Login', {
    url: '/login',
    templateUrl: '/views/login.html',
    controller: 'AuthenticationCtrl'
  })
  .state('Home', {
    url: '/',
    templateUrl: '/views/home.html',
    controller: 'HomeCtrl'
  })
});
