'use strict';

var express = require('express');
var controller = require('./search.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

// TODO: cache this
router.get('/configuration', auth.isAuthenticated(), controller.configuration);
router.get('/:controller', auth.isAuthenticated(), controller.index);

module.exports = router;
