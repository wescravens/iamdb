'use strict';

function PlayCtrl(
  $http,
  $scope,
  $log,
  Auth,
  Play,
  socket
){
  $scope.games = [];
  $scope.currentUser = Auth.getCurrentUser();

  console.log('games controller');

  $scope.fetchGames = function () {
    console.log('fetching games');
    Play.fetchGames(function (games) {
      console.log('recieved %s', games.length, games);
      $scope.games = games;
      socket.syncUpdates('game', $scope.games);
    });
  };

  $scope.isPlayer = function (user, game) {
    return !!_.find(game.players, {_id: user._id});
  };

  $scope.joinGame = function (game) {
    Play.joinGame(game, function () {
      console.log('joined game', game);
    });
  };

  $scope.leaveGame = function (game) {
    Play.leaveGame(game, function (game) {
      console.log('left game', game);
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
  .controller('PlayCtrl', PlayCtrl);
