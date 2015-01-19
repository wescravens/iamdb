'use strict';

var express = require('express');
var controller = require('./game.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:name', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:name/join', auth.isAuthenticated(), controller.joinGame);
router.patch('/:name/join', auth.isAuthenticated(), controller.joinGame);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
router.delete('/:name', auth.isAuthenticated(), controller.destroy);

module.exports = router;
