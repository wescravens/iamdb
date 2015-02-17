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
exports.validate = function (turn) {
  var ret = new comb.Promise();
  if (!turn || _.isEmpty(turn))
    return ret.errback({room: turn.game.name, message: 'Turn object is empty or undefined'});
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
    qs: apiParams
  };

  request(options, function (err, response, body) {
    if (err) return ret.errback({room: turn.game.name, message: err});
    body = JSON.parse(body);
    var reference = _(body.cast).findWhere({id: movie});
    turn.isValid = !!reference;
    turn.character = turn.valid ? reference.character : '';
    ret.callback(body);
  });

  return ret.promise();
};

/**
 * Forwards search requests by adding the TMDB api key and setting
 * a forwarding request header to the ip of the original request
 * @param  {Object}   req Express request from an api controller
 * @param  {Function} cb  Callback function is called when TMDB responds
 * @return {void}
 */
exports.search = function (req) {
  var ret = new comb.Promise();
  var reqOptions = {
    method: 'GET',
    url: baseUrl + '/search/' + req.params.controller,
    qs: _.assign({}, req.query, apiParams),
    headers: {'x-forwarded-for': req.ip}
  };
  request(reqOptions, function (err, response, body) {
    if (err) return ret.errback(err);
    if (response.statusCode !== 200) {
      return ret.errback(response.statusCode);
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
    headers: {'x-forwarded-for': req.ip, 'content-type': 'application/json'}
  };
  request(options, function (err, response, body) {
    if (err) return cb(err);
    cb(null, JSON.parse(body), response.statusCode);
  });
};
