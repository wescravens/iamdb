'use strict';

angular.module('iamdbApp')
  .service('Turn', Turn);

function Turn(
  socket
){
  var io = socket.socket;

  return {
    start: function (turn) {
      io.emit('turn:start', turn);
    },

    answer: function (turn) {
      io.emit('turn:answer', turn);
    },

    challenge: function (turn) {
      io.emit('turn:challenge', turn);
    },

    onEnd: function (cb) {
      io.on('turn:end', cb);
    },

    onError: function (cb) {
      io.on('turn:error', cb);
    },

    unsyncUpdates: function () {
      io.removeAllListeners('turn:start');
      io.removeAllListeners('turn:answer');
      io.removeAllListeners('turn:challenge');
      io.removeAllListeners('turn:end');
      io.removeAllListeners('turn:error');
    }
  };
}
