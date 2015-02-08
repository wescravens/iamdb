var _ = require('lodash');
var request = require('request');
var config = require('../../config/environment');
var apiParams = {api_key: config.tmdb.apiKey};
var baseUrl = config.tmdb.baseUrl;
var configUrl = '/configuration';

if (!apiParams.api_key && process.env.NODE_ENV === 'development') {
  baseUrl = 'http://iamdb.herokuapp.com/';
  configUrl = '/search/configuration';
}

/**
 * Validates a TMDB actor or movie
 * @param  {[type]}   gameName [description]
 * @param  {[type]}   turn     [description]
 * @param  {Function} cb       [description]
 * @return {[type]}            [description]
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

exports.configuration = function (req, cb) {
  var options = {
    method: 'GET',
    url: baseUrl + configUrl,
    qs: apiParams,
    headers: {'x-forwarded-for': req.ip}
  };
  request(options, function (err, response, body) {
    if (err) cb(err);
    cb(null, body, response.statusCode);
  });
};
