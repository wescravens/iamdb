'use strict';

function Main(
  $scope,
  $location,
  $http,
  Auth,
  Play
){
  if (!Auth.isLoggedIn()) {
    $location.href = '/login';
  }

  $scope.currentUser = Auth.getCurrentUser();

  $scope.myTurn = function () {
    console.log('myturn');
    $scope.game.turn = $scope.currentUser._id;
    Play.sendState($scope.game);
  };

  // TODO: remove this
  $scope.searchTMDB = function () {
    $http.get('/api/search/person', {params: {query: $scope.query}})
      .success(function (data) {
        console.log('success', data);
      })
      .error(function (data, status) {
        console.log('error', data, status);
      })
    ;
  };
}

angular.module('iamdbApp')
  .controller('MainCtrl', Main);
