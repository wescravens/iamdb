'use strict';

function PlayCtrl(
  $scope,
  Auth,
  Play,
  socket,
  util
){
  $scope.games = [];
  $scope.currentUserGames = [];
  $scope.currentUser = Auth.getCurrentUser();

  $scope.fetchGames = function () {
    Play.fetchGames().then(function (games) {
      $scope.games = games;
      socket.syncUpdates('game', function (newGame) {
        util.addOrReplace($scope.games, newGame, {name: newGame.name});
      });
    });
  };

  $scope.errorMessage = '';
  $scope.createGame = function () {
    Play.createGame($scope.gameName, function (err) {
      if (err && err.status === 409) {
        $scope.errorMessage = 'Game already exists';
        $scope.gameName = '';
        return;
      }
      if (err) return handleError(err);
      $scope.errorMessage = '';
      $scope.gameName = '';
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

  $scope.$on('$destroy', function () {
    socket.unsyncUpdates('game');
  });

  function handleError(err) {
    console.log('$resource error: ', err);
  }
}

angular.module('iamdbApp')
  .controller('PlayCtrl', PlayCtrl);
