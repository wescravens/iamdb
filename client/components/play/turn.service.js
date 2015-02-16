'use strict';

angular.module('iamdbApp')
  .factory('Turn', Turn);

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

    unSync: function () {
      socket.removeAllListeners('turn:start');
      socket.removeAllListeners('turn:answer');
      socket.removeAllListeners('turn:challenge');
      socket.removeAllListeners('turn:end');
      socket.removeAllListeners('turn:error');
    }
  };
}
