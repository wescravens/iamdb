var turnFactory = require('./turn.factory');
var tmdbService = require('../tmdb/tmdb.service');
var _ = require('lodash');
var search;

exports.create = function (options) {
  return turnFactory(options);
};

exports.answer = function (turn) {
  turn.input = turn.input;
  console.log('turn answer', turn);
  return tmdbService.validate(turn);
};

exports.challenge = function (turn) {
  turn.end();
  return turn;
};
