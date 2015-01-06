'use strict';

angular.module('iamdbApp')
  .controller('GamesCtrl', function ($http, $scope, Auth, socket, CONSTANTS, play) {
    $scope.games = [];

    function getUser () {
      var currentUser = Auth.getCurrentUser();
      if (!currentUser) {
        location.href = CONSTANTS.UI_ENDPOINTS.LOGIN_ROUTE;
        return;
      }
      return currentUser;
    }

    $http.get(CONSTANTS.API_ENDPOINTS.GAMES).success(function (games) {
      $scope.games = games;
      socket.syncUpdates('game', games);
    });

    $scope.addGame = function () {
      if (_.find($scope.games, {name: $scope.newGame})) {
        alert('Game ' + $scope.newGame + ' alredy exists.');
        return;
      }
      $http.post(CONSTANTS.API_ENDPOINTS.GAMES, {name: $scope.newGame})
        .success(function(game) {
          $scope.joinGame(game);
        });
      // $scope.newGame = '';
    };

    // $scope.joinGame = function (game) {
    //   var currentUser = getUser();
    //   if (_.indexOf(game.players, currentUser._id) !== -1) {return;}
    //   game.players.push(currentUser._id);
    //   console.log('game', game);
    //   $http.patch(CONSTANTS.API_ENDPOINTS.GAMES + '/' + game._id + '/join', currentUser);
    //   location = CONSTANTS.UI_ENDPOINTS.PLAY + '/' + game._id;
    // };

    $scope.joinGame = function (game) {
      play.joinGame(game, function () {
          console.log('game', game);
          play.goToGame(game);
        });
    };

    $scope.leaveGame = function (game) {
      play.leaveGame(game, function () {
        console.log('game', game);
      });
    };

    $scope.endGame = function (game) {
      $http.delete(CONSTANTS.API_ENDPOINTS.GAMES + '/' + game._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('game');
    });
  });
