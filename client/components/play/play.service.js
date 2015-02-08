'use strict';

function Play(
  $stateParams,
  $q,
  Auth,
  Game
){

  return {
    /**
     * Create a new game
     * @param  {Object}   game     - Initial Game object
     * @param  {Function} callback - Invoked on api response
     * @return {[type]}
     */
    createGame: function (game, callback) {
      var cb = callback || angular.noop;
      return Game
        .save(
          game,
          function (game) { return cb(game); },
          function (err) { return cb(err); }
        )
        .$promise
      ;
    },
    /**
     * Requests a single game
     * @param  {Object}   game     - Game object
     * @param  {Function} callback - Invoked on api response
     * @return {Promise}
     */
    fetchGame: function (gameName, callback) {
      var cb = callback || angular.noop;

      return Game
        .get(
          {name: gameName},
          function (game) { return cb(game); },
          function (err) { return cb(err); }
        )
        .$promise
      ;
    },
    /**
     * Requests a list of games
     * @param  {Function} callback  - Invoked on api response
     * @return {Promise}
     */
    fetchGames: function (callback) {
      var cb = callback || angular.noop;

      return Game
        .query(
          function (games) { return cb(games); },
          function (err) { return cb(err); }
        )
        .$promise
      ;
    },
    /**
     * Add User to Game
     * @param  {Object}   game      - Game object
     * @param  {Function} callback  - Invoked on api response
     * @return {Promise}
     */
    joinGame: function (game, callback) {
      var cb = callback || angular.noop;

      return Game
        .join(
          {
            name: game.name,
            controller: 'join'
          },
          Auth.getCurrentUser(),
          function (game) { return cb(game); },
          function (err) { return cb(err); }
        )
        .$promise
      ;
    },
    /**
     * Remove User from Game
     * @param  {Object}   game      - Game object
     * @param  {Function} callback  - Invoked on api response
     * @return {Promise}
     */
    leaveGame: function (game, callback) {
      var cb = callback || angular.noop;

      return Game
        .leave(
          {
            name: game.name,
            controller: 'leave'
          },
          Auth.getCurrentUser(),
          function (game) { return cb(game); },
          function (err) { return cb(err); }
        )
        .$promise
      ;
    },
    /**
     * Delete your game
     * @param  {Object}   game     - Game object
     * @param  {Function} callback - Invoked on api response or if currentUser does not have ownership of the game
     * @return {Promise}
     */
    removeGame: function (game, callback) {
      var cb = callback || angular.noop;

      return Game
        .remove(
          game,
          function () { return cb(); },
          function (err) { return cb(err); }
        )
        .$promise
      ;
    },
    sendState: function (game, callback) {
      var cb = callback || angular.noop;

      return Game
        .update(
          {name: game.name},
          game,
          function () { return cb(); },
          function (err) { return cb(err); }
        ).$promise
      ;
    }
  };
}

angular.module('iamdbApp')
  .factory('Play', Play);
