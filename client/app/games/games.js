'use strict';

angular.module('iamdbApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('games', {
        url: '/games',
        templateUrl: 'app/games/games.html',
        controller: 'GamesCtrl'
      });
  });
