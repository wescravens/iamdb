/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Game = require('./game.model');
var config = require('../../config/environment');

exports.register = function(socket) {
  Game.schema.post('save', function (game) {
    Game.findOne({_id: game._id})
      .populate({
        path: 'players host',
        select: config.userPrivateFields,
      })
      .exec(function (err, doc) {
        if (err) return onError(socket, 'Failed to populate players');
        onSave(socket, doc);
      })
    ;
  });

  Game.schema.post('remove', function (game) {
    onRemove(socket, game);
  });

  socket.on('game:create', function (game) {
    socket.join(game.name);
  });

  socket.on('game:join', function (obj) {
    if (socket.rooms['/' + obj.game.name]) {onError(socket, obj.game);}
    socket.join(obj.game.name);
    socket.to(obj.game.name).emit('game:playerjoined', obj.player);
  });

  socket.on('game:start', function (sock) {
    console.log('game start', sock);
  });
}

function onSave (socket, game) {
  socket.emit('game:save', game);
  // socket.to(game.name).emit('game:save', game);
}

function onRemove (socket, game) {
  // socket.emit('game:remove', game);
  // socket.to(game.name).emit('game:save', game);
}

function onError (socket, message) {
  socket.emit('game:error', {message: message})
}
