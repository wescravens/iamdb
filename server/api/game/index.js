'use strict';

var express = require('express');
var controller = require('./game.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:name', controller.show);
router.post('/', controller.create);
router.put('/:name/join', controller.joinGame);
router.patch('/:name/join', controller.joinGame);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
router.delete('/:name', controller.destroy);

module.exports = router;
