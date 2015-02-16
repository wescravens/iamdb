'use strict';

angular.module('iamdbApp')
  .factory('Play', Play);

function Play(
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
          function (game) { return cb(null, game); },
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
          function (game) { return cb(null, game); },
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
          function (games) { return cb(null, games); },
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
          {name: game.name},
          Auth.getCurrentUser(),
          function (game) { return cb(null, game); },
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
          {name: game.name},
          Auth.getCurrentUser(),
          function (game) { return cb(null, game); },
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
          {name: game.name},
          function () { return cb(); },
          function (err) { return cb(err); }
        )
        .$promise
      ;
    },

    validate: function (game, turn, callback) {
      var cb = callback || angular.noop;

      return Game
        .validate(
          {game: game.name},
          turn,
          function (game) { return cb(null, game); },
          function (err) { return cb(err); }
        )
        .$promise
      ;
    },

    getConfiguration: function (cb) {
      Game.getConfiguration(
          {},
          function (conf) { return cb(null, conf); },
          function (err) { return cb(err); }
        )
      ;
    }
  };
}
