/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Game = require('./game.model');

exports.register = function(socket) {
  Game.schema.post('save', function (game) {
    onSave(socket, game);
  });

  Game.schema.post('remove', function (game) {
    onRemove(socket, game);
  });
}

function onSave (socket, game, cb) {
  console.log('game socket save', game);
  socket.emit('game:save', game);
  socket.to(game.name).emit('game:save', game);
}

function onRemove (socket, game, cb) {
  socket.emit('game:remove', game);
  socket.to(game.name).emit('game:save', game);
}
