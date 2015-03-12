/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var redis = require('redis');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
});

socketio.adapter(require('socket.io-redis')(config.redis));

require('./config/redis').register();
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

require('./api/user/user.controller').server()
  .then(function (user) {
    console.log('got server user', user);
    global.SERVER_USER = user;
  }, function (err) {
    console.error('failed to retrieve server user from db: ', err);
  });

// Expose app
exports = module.exports = app;
