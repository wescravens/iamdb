'use strict';

var config = require('../../config/environment');
var Game = require('./game.model');
var util = require('../../components/util');
var turnService = require('../../components/turn/turn.service');
var registerIO = util.registerIO;

exports.register = function(socket) {
  // socket events
  registerIO(socket, {
    'game:join': function (packet) {
      if (!this || !this.rooms['/' + packet.game.name])
        return onError(this, packet.game.name + ' is not an existing room.');
      this.join(packet.game.name);
      this.to(packet.game.name).emit('game:join', packet.player);
    },
    'game:start': function (packet) {
      console.log('game:start', packet);
      var turn = turnService.create({
        player: packet.game.host,
        game: packet.game
      });
      Game.findOne({_id: packet.game._id}, function (err, game) {
        if (err)
          return onError(socket, packet.game.name, packet.game.name + ' could not be found.');
        game.history.unshift(turn);
        game.save();
        socket.to(game.name).emit('game:started', game);
      });
    }
  });

  // mongoose events
  registerIO(Game, {
    afterInsert: function (game) {
      socket.emit('game:create', {game: game});
    }
  });
};

function onError (socket, room, message) {
  if (!room)
    return socket.emit('game:error', {message: message})
  socket.to(room).emit(message);
}
