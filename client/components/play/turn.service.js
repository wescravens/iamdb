'use strict';

angular.module('iamdbApp')
  .factory('Turn', Turn);

function Turn(
  socket
){
  var io = socket.socket;

  return {
    start: function (turn) {
      io.emit('start turn', turn);
    },

    answer: function (turn) {
      io.emit('answer turn', turn);
    },

    challenge: function (turn) {
      io.emit('challenge turn', turn);
    }
  };
}
