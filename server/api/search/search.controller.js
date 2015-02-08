'use strict';

var _ = require('lodash');
var Search = require('./search.model');
var tmdbService = require('../../components/tmdb/tmdb.service');

// Get list of searchs
exports.index = function(req, res) {
  console.log('controller', req.params.controller);
  tmdbService.search(req, function (err, json, status) {
    if (err) return res.send(err.statusCode);
    res.json(status, json);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
