'use strict';

function Main(
  $scope,
  $location,
  $http,
  Auth
){
  if (!Auth.isLoggedIn()) {
    $location.href = '/login';
  }

  $scope.currentUser = Auth.getCurrentUser();
}

angular.module('iamdbApp')
  .controller('MainCtrl', Main);
