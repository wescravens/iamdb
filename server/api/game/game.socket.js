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

  socket.on('join game', socket.join);
}

function onSave (socket, game, cb) {
  // socket.emit('game:save', game);
  console.log('socket manager', socket.manager.rooms);
  if (socket.manager.rooms["/" + game.name]) return;
  socket.to(game.name).emit('game:save', game);
}

function onRemove (socket, game, cb) {
  // socket.emit('game:remove', game);
  if (socket.manager.rooms["/" + game.name]) return;
  socket.to(game.name).emit('game:save', game);
}
