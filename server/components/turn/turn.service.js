var Turn = require('./turn').Turn;
var tmdbService = require('../tmdb/tmdb.service');
var search;

exports.start = function (options) {
  var turn = new Turn(options).start();
};

exports.answer = function (answer) {

};

exports.challenge = function () {

};

exports.search = function (options) {
  tmdbService.search(options);
};
