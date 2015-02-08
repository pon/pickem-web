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
  'ui.bootstrap',
  'ui.router'
])
.config(function ($httpProvider, $locationProvider, $stateProvider,
    $urlRouterProvider, flashProvider) {

  // Add interceptor to add JWT header
  $httpProvider.interceptors.push('authInterceptor');

  $locationProvider.html5Mode(true);

  // Redirect any unmatched route to landing
  $urlRouterProvider.otherwise('/');
});
