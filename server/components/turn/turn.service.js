var turnFactory = require('./turn.factory');
var tmdbService = require('../tmdb/tmdb.service');

exports.create = function (options) {
  return turnFactory(options);
};

exports.answer = function (turn) {
  turn.end('answered');
  return tmdbService.validate(turn);
};

exports.challenge = function (turn) {
  turn.end('challenged');
  return turn;
};
