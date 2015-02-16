var turnFactory = require('./turn.factory');
var tmdbService = require('../tmdb/tmdb.service');
var search;

exports.create = function (options) {
  return turnFactory(options);
};

exports.answer = function (turn) {
  console.log('turn answer', turn);
  turn.end('answered');
  return tmdbService.validate(turn);
};

exports.challenge = function (turn) {
  turn.end('challenged');
  return turn;
};
