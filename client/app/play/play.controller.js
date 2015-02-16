'use strict';

function PlayCtrl(
  $scope,
  Auth,
  Play,
  socket
){
  $scope.games = [];
  $scope.currentUserGames = [];
  $scope.currentUser = Auth.getCurrentUser();

  $scope.fetchGames = function () {
    Play.fetchGames(function (err, games) {
      if (err) return handleError(err); // TODO: handle err
      $scope.games = games;
      socket.syncUpdates('game', $scope.games, function (item) {
        console.log('socket emit save:game on ', item);
      });
    });
  };

  $scope.isPlayer = function (user, game) {
    return !!_.find(game.players, {_id: user._id});
  };

  $scope.errorMessage = '';
  $scope.createGame = function () {
    var newGame = {
      name: $scope.gameName,
      players: [$scope.currentUser._id]
    };
    Play.createGame(newGame, function (err) {
      if (err.status === 409) {
        $scope.errorMessage = 'Game already exists';
        return;
      }
      if (err)
      $scope.errorMessage = '';
    });
  };

  $scope.filter = {};

  $scope.gameFilter = {
    apply: function (user) {
      $scope.filter = user;
    },
    remove: function () {
      $scope.filter = '';
    }
  };

  setTimeout(function () {
    console.log('scope', $scope.games);
  }, 2000);

  $scope.$on('$destroy', function () {
    socket.unsyncUpdates('game');
  });

  function handleError(err) {
    console.log('$resource error: ', err);
  }
}

angular.module('iamdbApp')
  .controller('PlayCtrl', PlayCtrl);
