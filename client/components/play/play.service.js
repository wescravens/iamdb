'use strict';

angular.module('iamdbApp')
  .service('play', function ($http, $stateParams, Auth, CONSTANTS) {
    var exports = {};

    exports.joinGame = function (game, cb) {
      console.log('join');
      var currentUser = Auth.getCurrentUser();
      console.log('here');
      return $http.put(CONSTANTS.API_ENDPOINTS.GAMES + '/' + game._id + '/join', currentUser).success(function () { console.log('success');});
    }

    exports.goToGame = function (game) {
      location = CONSTANTS.UI_ENDPOINTS.PLAY + '/' + game._id;
    };

    exports.leaveGame = function (game, cb) {
      var currentUser = Auth.getCurrentUser();
      console.log('test');
      return $http.put(CONSTANTS.API_ENDPOINTS.GAMES + '/' + game._id + '/leave', currentUser).success(function () { console.log('success');});
    }

    exports.fetchGame = function () {
      return $http.get(CONSTANTS.API_ENDPOINTS.GAMES + '/' + $stateParams.gameId);
    }

    return exports;
  });
