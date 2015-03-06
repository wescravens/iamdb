'use strict';

var controller = require('./game.controller');

exports.list = function (req, res) {
  controller.list()
    .then(onSuccess, onError)
  ;

  function onSuccess (doc) {
    res.json(doc.status, doc.data);
  }

  function onError (err) {
    handleError(res, err.status, err.error);
  }
};

exports.one = function (req, res) {
  controller.one(req.params.name)
    .then(onSuccess, onError)
  ;

  function onSuccess (doc) {
    res.json(doc.status, doc.data);
  }

  function onError (err) {
    handleError(res, err.status, err.error);
  }
};

exports.create = function(req, res) {
  controller.create(req.body)
    .then(onSuccess, onError)
  ;

  function onSuccess (doc) {
    res.json(doc.status, doc.data);
  }

  function onError (err) {
    handleError(res, err.status, err.error);
  }
};

exports.update = function (req, res) {
  controller.update(req.params.name, req.body)
    .then(onSuccess, onError)
  ;

  function onSuccess (doc) {
    res.json(doc.status, doc.data);
  }

  function onError (err) {
    handleError(res, err.status, err.error);
  }
};

exports.joinGame = function (req, res) {
  controller.joinGame(req.params.name, req.body)
    .then(onSuccess, onError)
  ;

  function onSuccess (doc) {
    res.json(doc.status, doc.data);
  }

  function onError (err) {
    handleError(err.status, err.error);
  }
};

exports.leaveGame = function (req, res) {
  controller.leaveGame(req.params.name, req.body)
    .then(onSuccess, onError)
  ;

  function onSuccess (doc) {
    res.json(doc.status, doc.data);
  }

  function onError (err) {
    handleError(err.status, err.error);
  }
};

exports.destroy = function (req, res) {
  controller.destroy(req.params.name)
    .then(onSuccess, onError)
  ;

  function onSuccess (doc) {
    res.json(doc.status, doc.data);
  }

  function onError (err) {
    handleError(err.status, err.error);
  }
};

function handleError(res, status, error) {
  return res.send(status, error);
}
