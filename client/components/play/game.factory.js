'use strict';

angular.module('iamdbApp')
  .factory('gameFactory', gameFactory);

function gameFactory (Game, Auth, util) {
  var _gameFactory = {};

  _gameFactory.create = function (gameResource) {
    return new Game(gameResource);
  };

  function Game (gameName) {
    this.init(gameName);
  }

  var _proto = Game.prototype;

  _proto.init = function (gameName) {
    var self = this;
    self.name = gameName;

    function onGameFetchSuccess (gameResource) {
      _.assign(self, gameResource, {model: gameResource});
    }

    function onGameFetchError (err) {

    }
  };

  _proto.fetch = function () {

  };

  return _gameFactory;
}

