'use strict';

function Main(
  $scope
){
  $scope.games = [];
}

angular.module('iamdbApp')
  .controller('MainCtrl', Main);
