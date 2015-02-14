var _ = require('lodash');
var comb = require('comb');
var request = require('request');
var config = require('../../config/environment');
var apiParams = {api_key: config.tmdb.apiKey};
var baseUrl = config.tmdb.baseUrl;

/**
 * Validates a TMDB actor or movie
 * @param  {Object}   req     Express request from api controller
 * @param  {Function} cb      Callback function when the TMDB request(s) and validations complete/error
 * @return {void}
 */
exports.validate = function (req, cb) {
  cb = cb || _.noop;
  var turn = req.query;
  if (!turn || _.isEmpty(turn)) return cb(null, 404, turn);
  var actor = turn.input = Number(turn.input);
  var movie = turn.subject = Number(turn.subject);

  if (turn.isActor) {
    actor = turn.subject;
    movie = turn.input;
  }

  var controller = '/person/' + actor + '/movie_credits'

  var options = {
    method: 'GET',
    url: baseUrl + controller,
    qs: _.assign({}, req.query, apiParams)
  };

  request(options, function (err, response, body) {
    if (err) return cb(err);
    body = JSON.parse(body);
    var reference = _.find(body.cast, {id: movie});
    turn.valid = !!reference;
    turn.character = turn.valid ? reference.character : '';
    cb(null, 200, turn);
  });
};

/**
 * Forwards search requests by adding the TMDB api key and setting
 * a forwarding request header to the ip of the original request
 * @param  {Object}   req Express request from an api controller
 * @param  {Function} cb  Callback function is called when TMDB responds
 * @return {void}
 */
exports.search = function (options) {
  var ret = new comb.Promise();
  var reqOptions = {
    method: 'GET',
    url: baseUrl + '/search/' + options.collection,
    qs: _.assign({}, options.query, apiParams)
  };
  request(reqOptions, function (err, response, body) {
    if (err) ret.errback(err);
    if (response.statusCode !== 200) {
      ret.errback(response.statusCode);
    }
    ret.callback(body);
  });
  return ret.promise();
};

/**
 * Requests the configuration JSON from TMDB
 * @param  {Object}   req Express request from api controller
 * @param  {Function} cb  Callback function is called when TMDB responds
 * @return {void}
 */
exports.configuration = function (req, cb) {
  cb = cb || _.noop;
  var options = {
    method: 'GET',
    url: baseUrl + '/configuration',
    qs: apiParams,
    headers: {'x-forwarded-for': req.ip}
  };
  request(options, function (err, response, body) {
    if (err) return cb(err);
    cb(null, body, response.statusCode);
  });
};
