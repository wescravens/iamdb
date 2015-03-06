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

  $scope.$watch('games', function (games) {
    console.log('games watch', games);
  });

  $scope.fetchGames = function () {
    Play.fetchGames()
      .then(onFetchSuccess, handleError)
    ;

    function onFetchSuccess (games) {
      $scope.games = games;
      socket.registerIO(ioEvents);
    }
  };

  var ioEvents = {
    'game:created': onGameCreated,
    'game:removed': onGameRemoved
  };

  function onGameCreated (newGame) {
    console.log('game update', newGame, this);
    util.pushWhere($scope.games, newGame, {name: newGame.name});
  }

  function onGameRemoved (removed) {
    console.log('game removed', removed);
    util.pullWhere($scope.games, {name: removed.name});
  }

  $scope.errorMessage = '';
  $scope.createGame = function () {
    Play.createGame($scope.gameName)
      .then(onCreateGameSuccess, onCreateGameError)
    ;

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
  };

  function getStateRoot () {
    return $state.current.name.split('.')[0];
  }

  $scope.$on('$destroy', function () {
    socket.deregisterIO(ioEvents);
  });

  function handleError(err) {
    console.log('$resource error: ', err);
  }
}
