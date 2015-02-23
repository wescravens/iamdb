'use strict';

var _ = require('lodash');
var Game = require('./game.model');
var config = require('../../config/environment');
var tmdbService = require('../../components/tmdb/tmdb.service');
var comb = require('comb');

// Get list of games
exports.list = function() {
  var dfd = new comb.Promise();
  Game.find({})
    .populate({
      path: 'players history host',
      select: config.userPrivateFields
    })
    .exec(function (err, games) {
      if (err) return dfd.errback({status: 500, error: err});
      dfd.callback({status: 200, data: games});
    })
  ;
  return dfd.promise();
};

// Get a single game and add user objects to response
exports.one = function(name) {
  var dfd = new comb.Promise();
  Game
    .findOne({name: name})
    .populate({
      path: 'players host',
      select: config.userPrivateFields,
    })
    .exec(function (err, game) {
      if (err) return dfd.errback({status: 500, error: err});
      if (!game) return dfd.errback({status: 404});
      dfd.callback({status: 200, data: game});
    })
  ;
  return dfd.promise();
};

// Creates a new game in the DB.
exports.create = function (initialGame) {
  var dfd = new comb.Promise();
  Game.create(initialGame, function(err, game) {
    if (err && err.code === 11000) {
      return dfd.errback({status: 409, error: err})
    }
    if (err) return dfd.errback({status: 500, error: err});
    Game.findOne({_id: game._id})
      .populate({
        path: 'players host',
        select: config.userPrivateFields,
      })
      .exec(function (populatedGame) {
        return dfd.callback({status: 201, data: populatedGame})
      })
    ;
  });
  return dfd.promise();
};

// Updates an existing game in the DB.
exports.update = function(name, updated) {
  var dfd = new comb.Promise();
  Game.findOne({name: name})
    .exec(function (err, game) {
      if (err) return dfd.errback({status: 500, error: err});
      if (!game) return dfd.errback({status: 404, error: err});
      _.merge(game, updated);
      game.save();
      dfd.callback({status: 200, data: game});
    })
  ;
  return dfd.promise();
};

exports.joinGame = function (name, user) {
  var dfd = new comb.Promise();
  Game.findOne(
    {name: name},
    function (err, game) {
      if (err) return dfd.errback({status: 500, error: err});
      var duplicatePlayer = game.players.some(function (player) {
        return player.equals(user._id);
      });
      if (duplicatePlayer) return dfd.callback({status: 200, data: game});
      game.players.push(user._id);
      game.save();
      dfd.callback({status: 200, data: game});
    }
  );
  return dfd.promise();
};

exports.leaveGame = function (name, user) {
  var dfd = new comb.Promise();
  Game.findOne(
    {name: name},
    {$pull: {players: user._id}},
    function (err, game) {
      if (err) return dfd.errback({status: 500, error: err});
      dfd.callback({status: 200, data: game});
    }
  );
  return dfd.promise();
};

// Deletes a game from the DB.
exports.destroy = function (name) {
  var dfd = new comb.Promise();
  Game.findOne({name: name})
    .exec(function (err, game) {
      if (err) return dfd.errback({status: 500, error: err});
      if (!game) return dfd.errback({status: 404});
      game.remove(function(err) {
        if (err) return dfd.errback({status: 500, error: err});
        return dfd.callback({status: 204});
      });
    })
  ;
  return dfd.promise();
};
