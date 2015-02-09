'use strict';

module.exports = function (flash, $location, $scope, $state,
    $window, Authentication) {

  $scope.login = function (form) {
    Authentication.getToken({
      email: form.email,
      password: form.password
    })
    .success(function (data) {
      $window.sessionStorage.token = data.token;
      return Authentication.getUserFromToken()
      .success(function (data) {
        console.log(data);
        Authentication.setCurrentUser(data);
        $state.go('Home');
      })
      .error(function (data) {
        throw data;
      });
    })
    .error(function (data) {
      delete $window.sessionStorage.token;
      flash.to('login-flash').error = data.message;
    });
  };

  $scope.logout = function () {
    Authentication.setCurrentUser(false);
    $scope.getCurrentUser();
    $state.go('Login');
  };

  $scope.getCurrentUser = function () {
    $scope.currentUser = Authentication.getCurrentUser();
  };
};
