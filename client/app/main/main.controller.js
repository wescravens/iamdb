'use strict';

function Main(
  $scope,
  $location,
  Auth
){
  $scope.games = [];

  if (!Auth.isLoggedIn()) {
    console.log('test');
    $location.href = '/login';
  }
}

angular.module('iamdbApp')
  .controller('MainCtrl', Main);
