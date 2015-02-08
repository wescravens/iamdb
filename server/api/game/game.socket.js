/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Game = require('./game.model');

exports.register = function(socket) {
  Game.schema.post('save', function (game) {
    onSave(socket, game);
  });

  Game.schema.post('join', function (game) {
    onJoin(socket, game);
  });

  Game.schema.post('remove', function (game) {
    onRemove(socket, game);
  });
}

function onSave (socket, game, cb) {
  socket.emit('game:save', game);
  console.log('game', game);
}

function onJoin (socket, game, cb) {
  socket.emit('game:join', game);
}

function onRemove (socket, game, cb) {
  socket.emit('game:remove', game);
}
