'use strict';

var redis = require('redis');
var pub, sub;

exports.register = function () {
  pub = redis.createClient();
  sub = redis.createClient();
};

exports.publisher = pub;
exports.subscriber = sub;
