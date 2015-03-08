var turnService = require('./turn.service');
var registerIO = require('../util').registerIO;

exports.register = function (socket) {
  registerIO(socket, {
    'turn:start': registerTurn,
    'turn:answer': answerTurn,
    'turn:challenge': challengeTurn,
    'turn:forfeit': forfeitTurn
  });

  function registerTurn (options) {
    turnService.create(options).start()
      .then(endTurn)
    ;
  }

  function answerTurn (turn) {
    turnService.answer(turn)
      .then(endTurn, errorTurn)
    ;
  }

  function challengeTurn (turn) {
    turnService.challenge(turn)
      .then(endTurn)
    ;
  }

  function forfeitTurn (turn) {
    turnService.forfeit(turn)
      .then(endTurn)
    ;
  }

  function endTurn (turn) {
    socket.to(turn.game.name).emit('turn:end', turn);
  }

  function errorTurn (err) {
    socket.to(err.room).emit('turn:error', err.message);
  }
};
