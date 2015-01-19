'use strict';

var playStates = {
  index: {
    name: 'play',
    url: '/play',
    templateUrl: 'app/play/play.html',
    controller: 'PlayCtrl'
  },
  game: {
    name: 'play.game',
    url: '/:id',
    templateUrl: 'app/play/game/game.html',
    controller: 'PlayGameCtrl'
  }
};

angular.module('iamdbApp')
  .config(function ($stateProvider) {
    // _.each(playStates, function (state) {
    //   $stateProvider.state(state);
    // });
    $stateProvider.state(playStates.index);
    $stateProvider.state(playStates.game);
  });
