'use strict';

var express = require('express');
var httpController = require('./game.http');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', httpController.list);
router.get('/:name', httpController.one);
router.post('/', auth.isAuthenticated(), httpController.create);
router.put('/:name', auth.isAuthenticated(), httpController.update);
router.put('/:name/join', auth.isAuthenticated(), httpController.joinGame);
router.patch('/:name/join', auth.isAuthenticated(), httpController.joinGame);
// router.put('/:id', httpController.update);
// router.patch('/:id', httpController.update);
router.delete('/:name', auth.isAuthenticated(), httpController.destroy);

module.exports = router;
