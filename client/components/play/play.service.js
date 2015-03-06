'use strict';

angular.module('iamdbApp')
  .factory('Play', Play);

function Play(
  $q,
  Auth,
  socket,
  Game,
  util
){
  var currentUser = Auth.getCurrentUser();
  return {
    /**
     * Create a new game
     * @param  {Object}   game     - Initial Game object
     * @param  {Function} callback - Invoked on api response
     * @return {[type]}
     */
    createGame: function (name) {
      var defaults = {
        host: currentUser._id,
        name: name,
        players: [currentUser._id],
        log: [{
          message: 'Game "' + name + '" created.',
          timestamp: new Date()
        }]
      };
      return Game.save(defaults).$promise;
    },
    /**
     * Requests a single game
     * @param  {Object}   game     - Game object
     * @param  {Function} callback - Invoked on api response
     * @return {Promise}
     */
    fetchGame: function (gameName) {
      return Game.get({name: gameName}).$promise;
    },
    /**
     * Requests a list of games
     * @param  {Function} callback  - Invoked on api response
     * @return {Promise}
     */
    fetchGames: function () {
      return Game.query().$promise;
    },
    /**
     * Add User to Game
     * @param  {Object}   game      - Game object
     * @param  {Function} callback  - Invoked on api response
     * @return {Promise}
     */
    joinGame: function (game) {
      return Game.join({name: game.name}, Auth.getCurrentUser()).$promise;
    },
    /**
     * Remove User from Game
     * @param  {Object}   game      - Game object
     * @param  {Function} callback  - Invoked on api response
     * @return {Promise}
     */
    leaveGame: function (game) {
      return Game.leave({name: game.name}, Auth.getCurrentUser()).$promise;
    },
    /**
     * Delete your game
     * @param  {Object}   game     - Game object
     * @param  {Function} callback - Invoked on api response or if currentUser does not have ownership of the game
     * @return {Promise}
     */
    removeGame: function (game) {
      return Game.remove({name: game.name}).$promise;
    },

    validate: function (game, turn) {
      return Game.validate({game: game.name}, turn).$promise;
    },

    playerIsHost: function (player, game) {
      return !!util.find(game.players, {_id: player._id});
    },

    currentUserIsPlayer: function (game) {
      return !!util.find(game.players, {_id: currentUser._id});
    }
  };
}
