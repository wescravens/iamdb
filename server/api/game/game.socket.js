'use strict';

var config = require('../../config/environment');
var Game = require('./game.model');
var util = require('../../components/util');
var turnService = require('../../components/turn/turn.service');
var registerIO = util.registerIO;

exports.register = function(socket) {
  // socket events
  registerIO(socket, {
    'game:join': joinGame,
    'game:leave': leaveGame,
    'game:start': startGame
  });

  // mongoose events
  registerIO(Game, {
    'afterInsert': onCreate
  });

  function joinGame (packet) {
    if (!packet || !packet.game) return;
    socket.join(packet.game.name, function () {
      socket.emit('game:joined', packet.player);
    });
  }

  function leaveGame (packet) {
    if (!packet || !packet.game) return;
    socket.leave(packet.game.name, function () {
      console.log('Player %s is leaving game %s', packet.player.name, packet.game.name);
      socket.emit('game:left', packet.player);
    });
  }

  function startGame (packet) {
    if (!packet || !packet.game) return;
    console.log('game:started', packet);
    var turn = turnService.create({
      player: packet.game.host,
      game: packet.game
    });

    Game.findOne({_id: packet.game._id}, function (err, game) {
      if (err)
        return onError(packet.game.name, packet.game.name + ' could not be found.');
      game.history.unshift(turn);
      game.save();
      socket.emit('game:started', game);
    });
  }

  function onCreate (game) {
    socket.emit('game:created', {game: game});
  }

  function onError (room, message) {
    if (!room)
      return socket.emit('game:error', {message: message})
    socket.emit(message);
  }
};
