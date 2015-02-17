'use strict';

var _ = require('lodash');
var Search = require('./search.model');
var tmdbService = require('../../components/tmdb/tmdb.service');

exports.index = function(req, res) {
  tmdbService.search(req)
    .then(respond, handlePromiseErr);

  function respond (body) {
    res.json(200, body);
  }

  function handlePromiseErr (err) {
    res.send(500, err);
  }
};

exports.configuration = function (req, res) {
  tmdbService.configuration(req, function (err, json, status) {
    if (err) return res.send(err.statusCode);
    res.json(status, json);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
