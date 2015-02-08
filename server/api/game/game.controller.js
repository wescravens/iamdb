'use strict';

var _ = require('lodash');
var q = require('q');
var Game = require('./game.model');
var config = require('../../config/environment');
var tmdbService = require('../../components/tmdb/tmdb.service');

// Get list of games
exports.index = function(req, res) {
  Game.find(function (err, games) {
    if(err) { return handleError(res, err); }
    return res.json(200, games);
  });
};

// Get a single game and add user objects to response
exports.show = function(req, res) {
  Game
    .findOne({name: req.params.name})
    .populate({
      path: 'players',
      select: config.userPrivateFields,
    })
    .exec(function (err, game) {
      if (err) return handleError(res, err);
      if (!game) return res.send(404);
      res.json(200, game);
    })
  ;
};

// Creates a new game in the DB.
exports.create = function(req, res) {
  Game.create(req.body, function(err, game) {
    if (err && err.code === 11000) {
      return res.json(409, {message: 'Game already exists'});
    }
    if (err) return handleError(res, err);
    return res.json(201, game);
  });
};

// Updates an existing game in the DB.
exports.update = function(req, res) {
  // if(req.body._id) { delete req.body._id; }
  Game.findOne({name: req.params.name}, function (err, game) {
    if (err) { return handleError(res, err); }
    if (!game) { return res.send(404); }
    _.merge(game, req.body);
    game.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, game);
    });
  });
};

exports.joinGame = function (req, res) {
  console.log('Player ' + req.body.email + ' is joining game ' + req.params.name);
  Game.findOne(
    {name: req.params.name},
    function (err, game) {
      if (err) { return handleError(res, err); }
      var duplicatePlayer = game.players.some(function (player) {
        return player.equals(req.body._id);
      });
      if (duplicatePlayer) return res.json(200, game);
      game.players.push(req.body._id);
      game.save();
      res.json(200, game);
    }
  );
};

exports.leaveGame = function (req, res) {
  Game.findOne(
    {name: req.params.name},
    {$pull: {players: req.body._id}},
    function (err, game) {
      if (err) return handleError(res, err);
      res.json(200, game);
    }
  );
};

// Deletes a game from the DB.
exports.destroy = function(req, res) {
  Game.findById(req.params.id, function (err, game) {
    if (err) { return handleError(res, err); }
    if (!game) { return res.send(404); }
    game.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.configuration = function (req, res) {
  tmdbService.configuration(req, function (err, json, status) {
    if (err) return res.send(err.statusCode);
    res.json(status, json);
  });
};

exports.validate = function (req, res) {
  q.fcall(tmdbService.validate, req)
    .then(addToHistory)
    .then(function (game) {
      res.json(200, game);
    })
    .fail(function (err) {
      handleError(res, err);
    })
  ;

  function addToHistory (req, validTurn, cb) {
    var deferred = q.defer();
    cb = cb || _.noop;
    Game.findOne(
      {name: req.params.name},
      function (err, game) {
        if (err) {
          cb(err);
          deferred.reject(err);
          return;
        }

        game.history.unshift(validTurn);
        game.save();
        cb(null, game);
        deferred.resolve(game);
      }
    );
    return deferred;
  }
};

function handleError(res, err) {
  return res.send(500, err);
}
