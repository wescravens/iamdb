'use strict';

angular.module('iamdbApp')
  .controller('PlayCtrl', PlayCtrl);

function PlayCtrl(
  $scope,
  $location,
  $state,
  Auth,
  Play,
  socket,
  util
){
  $scope.games = [];
  $scope.currentUserGames = [];
  $scope.currentUser = Auth.getCurrentUser();

  $scope.fetchGames = function () {
    Play.fetchGames()
      .then(onFetchSuccess, onFetchError)
    ;
  };

  function onFetchSuccess (games) {
    $scope.games = games;
    socket.syncUpdates('game', function (newGame) {
      util.addOrReplace($scope.games, newGame, {name: newGame.name});
    });
  }

  function onFetchError (err) {
    handleError(err);
  }

  $scope.errorMessage = '';
  $scope.createGame = function () {
    Play.createGame($scope.gameName)
      .then(onCreateGameSuccess, onCreateGameError)
    ;
  };

  function onCreateGameSuccess (game) {
    $scope.errorMessage = '';
    $scope.gameName = '';
    // get parent state or current state to normalize
    $location.path(getStateRoot() + '/' + game.name);
  }

  function onCreateGameError (err) {
    if (err && err.status === 409) {
      $scope.errorMessage = 'Game already exists';
      $scope.gameName = '';
      return;
    }
    return handleError(err);
  }

  function getStateRoot () {
    return $state.current.name.split('.')[0];
  }

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
