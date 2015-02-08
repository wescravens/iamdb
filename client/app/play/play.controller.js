'use strict';

function PlayCtrl(
  $http,
  $scope,
  $log,
  $q,
  Auth,
  Play,
  dropdownService,
  socket
){
  $scope.games = [];
  $scope.currentUserGames = [];
  $scope.currentUser = Auth.getCurrentUser();

  function filterCurrentUserGames (games) {
    if (_.isEmpty($scope.currentUser)) {return;}
    $scope.currentUserGames = _.filter(games, function (game) {
      return _.indexOf(game.players, $scope.currentUser._id) !== -1;
    });
  }

  $scope.fetchGames = function () {
    Play.fetchGames(function (games) {
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
}

angular.module('iamdbApp')
  .controller('PlayCtrl', PlayCtrl);
