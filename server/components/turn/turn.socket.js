var turn = require('./turn.service');
var util = require('../util');

exports.register = function (socket) {
  util.registerIO(socket, {
    'turn:start': registerTurn,
    'turn:answer': answerTurn,
    'turn:challenge': challengeTurn
  });

  function registerTurn (options) {
    turn.create(options).start()
      .then(endTurn)
    ;
  }

  function answerTurn (turn) {
    turn.answer(turn)
      .then(endTurn, errorTurn)
    ;
  }

  function challengeTurn (turn) {
    turn.challenge(turn)
      .then(endTurn)
    ;
  }

  function endTurn (turn) {
    socket.in(turn.game.name).emit('turn:end', turn);
  }

  function errorTurn (err) {
    socket.in(err.room).emit('turn:error', err.message);
  }
};
