'use strict';

angular.module('iamdbApp')
  .controller('PlayCtrl', function ($scope, $http, $stateParams, socket, Auth, CONSTANTS, play) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.game = {};

    play.fetchGame().success(function (game) {
      console.log('game', game);
      $scope.game = game;
    });

    // $scope.joinGame = play.joinGame;
  })
;
