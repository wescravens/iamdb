var _ = require('lodash');
var request = require('request');
var config = require('../../config/environment');
var apiParams = {api_key: config.tmdb.apiKey};
var baseUrl = config.tmdb.baseUrl;


/**
 * Validates a TMDB actor or movie
 * @param  {String}   gameName Name of the game
 * @param  {Object}   turn     Object containing the question, type, and user input
 * @param  {Function} cb       Callback function when the TMDB request(s) and validations complete/error
 * @return {void}
 */
exports.validate = function (gameName, turn, cb) {
  cb = cb || _.noop;
  var controller = turn.question.isActor ? '/people/{id}/movie_credits' : '/movie/{id}/credits';
  request.get(baseUrl + controller, apiParams)
    .on('response', function (response) {
      console.log('response', response);
      cb(null, response);
    })
    .on('error', function (err) {
      cb(err);
    })
  ;
};

/**
 * Forwards search requests by adding the TMDB api key and setting
 * a forwarding request header to the ip of the original request
 * @param  {Object}   req Express request from an api controller
 * @param  {Function} cb  Callback function is called when TMDB responds
 * @return {void}
 */
exports.search = function (req, cb) {
  cb = cb || _.noop;
  var qs =  _.merge(req.query, apiParams);
  var options = {
    method: 'GET',
    url: baseUrl + '/search/' + req.params.controller,
    qs: qs,
    headers: {'x-forwarded-for': req.ip}
  };
  request(options, function (err, response, body) {
    if (err) cb(err);
    cb(null, body, response.statusCode);
  });
};

/**
 * Requests the configuration JSON from TMDB
 * @param  {Object}   req Express request from api controller
 * @param  {Function} cb  Callback function is called when TMDB responds
 * @return {void}
 */
exports.configuration = function (req, cb) {
  var options = {
    method: 'GET',
    url: baseUrl + '/configuration',
    qs: apiParams,
    headers: {'x-forwarded-for': req.ip}
  };
  request(options, function (err, response, body) {
    if (err) cb(err);
    cb(null, body, response.statusCode);
  });
};
