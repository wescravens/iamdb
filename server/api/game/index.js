'use strict';

var express = require('express');
var httpController = require('./game.http');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', httpController.index);

// TODO: cache this
router.get('/:name/validate', auth.isAuthenticated(), httpController.validate);
router.get('/:name', httpController.show);
router.post('/', auth.isAuthenticated(), httpController.http.create);
router.post('/log', auth.isAuthenticated(), httpController.log);
router.put('/:name', auth.isAuthenticated(), httpController.update);
router.put('/:name/join', auth.isAuthenticated(), httpController.joinGame);
router.patch('/:name/join', auth.isAuthenticated(), httpController.joinGame);
// router.put('/:id', httpController.update);
// router.patch('/:id', httpController.update);
router.delete('/:name', auth.isAuthenticated(), httpController.destroy);

module.exports = router;
