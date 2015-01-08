'use strict';

angular.module('iamdbApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('play', {
        url: '/play/:gameName',
        templateUrl: 'app/play/play.html',
        controller: 'PlayCtrl'
      });
  });
