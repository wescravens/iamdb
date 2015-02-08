'use strict';

var express = require('express');
var controller = require('./search.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:controller', auth.isAuthenticated(), controller.index);

module.exports = router;
