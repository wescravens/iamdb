'use strict';

function GamesController(
  $http,
  $scope,
  Auth,
  Play,
  socket
){
  $scope.games = [];
  $scope.currentUser = Auth.getCurrentUser();

  $scope.fetchGames = function () {
    console.log('fetching games');
    Play.fetchGames(function (games) {
      console.log('recieved %s', games.length, games);
      $scope.games = games;
      socket.syncUpdates('game', $scope.games);
    });
  };

  $scope.createGame = function () {
    var newGame = {
      name: $scope.gameName,
      players: [$scope.currentUser._id]
    };
    Play.createGame(newGame);
  };

  $scope.$on('$destroy', function () {
    socket.unsyncUpdates('game');
  });
}

angular.module('iamdbApp')
  .controller('GamesCtrl', GamesController);
