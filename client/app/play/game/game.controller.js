'use strict';

function PlayGameCtrl(
  $scope,
  $stateParams,
  $location,
  socket,
  Play,
  Auth
){
  $scope.currentUser = Auth.getCurrentUser();
  $scope.game = {};

  Play.fetchGame($stateParams.id, function (game) {
    console.log('game', game);
    $scope.game = game;
    // socket.syncUpdates('game', $scope.game);
  });

  $scope.playerIsHost = function (player) {
    return !!_.find($scope.game.players, {_id: player._id});
  };

  $scope.currentUserIsPlayer = function () {
    return _.indexOf($scope.game.players, $scope.currentUser._id) !== -1;
  };

  $scope.joinGame = function (game) {
    Play.joinGame(game, function (game) {
      console.log('joined game', game);
    });
  };

  $scope.$on('$destroy', function () {
    // socket.unsyncUpdates('game');
  });
}

angular.module('iamdbApp')
  .controller('PlayGameCtrl', PlayGameCtrl);
