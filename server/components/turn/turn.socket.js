var _ = require('lodash');
var turn = require('./turn.service');
var util = require('../util');

exports.register = function (socket) {
  var events = {
    'turn:start': registerTurn,
    'turn:answer': answerTurn,
    'turn:challenge': challengeTurn
  };
  util.forEachKV(events, socket.on);

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
    socket.to(turn.game.name).emit('turn:end', turn);
  }

  function errorTurn (err) {
    socket.to(err.room).emit('turn:error', err.message);
  }
};
