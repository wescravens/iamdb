'use strict';

function PlayGameCtrl(
  $scope,
  $stateParams,
  socket,
  search,
  Play,
  Turn,
  Auth
){

  $scope.currentUser = Auth.getCurrentUser();
  $scope.game = {};

  Play.fetchGame($stateParams.id, function (err, game) {
    if (err) return handleError(err);
    $scope.game = game;
    // socket.syncUpdates('game', $scope.game);
    socket.joinRoom(game.name);
  });

  Play.getConfiguration().then(function (conf) {
    conf = JSON.parse(conf);
    $scope.baseImageUrl = conf.images.base_url + 'w500';
  }, handleError);

  $scope.joinGame = function (game) {
    Play.joinGame(game);
  };

  $scope.startTurn = function (id) {
    $scope.turn = {
      player: $scope.currentUser._id,
      subject: 17051, // james franco
      isActor: true,
      input: id
    };
    Turn.start($scope.turn);
  };

  $scope.answerTurn = function () {

  };

  $scope.challengeTurn = function () {

  };

  $scope.playerIsHost = function (player) {
    return !!_.find($scope.game.players, {_id: player._id});
  };

  $scope.currentUserIsPlayer = function () {
    return !!_.find($scope.game.players, {_id: $scope.currentUser._id});
  };

  // $scope.$on('$destroy', function () {
  //   socket.unsyncUpdates('game');
  // });

  function handleError (err) {
    console.log('handle error', err);
  }
}

angular.module('iamdbApp')
  .controller('PlayGameCtrl', PlayGameCtrl);
