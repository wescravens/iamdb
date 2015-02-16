var _ = require('lodash');
var forEachKV = _.rearg(_.forEach, [1, 0]);
var turnService = require('./turn.service');

exports.register = function (socket) {
  var events = {
    'start turn': registerTurn,
    'answer turn': answerTurn,
    'challenge turn': challengeTurn
  };

  forEachKV(events, socket.on);

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

  function endTurn (turn) {
    socket.to(turn.game.name).emit('turn end', turn);
  }

  function errorTurn (err) {
    socket.to(err.room).emit('turn error', err.message);
  }
};
