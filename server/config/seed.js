/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Game = require('../api/game/game.model');


Game.find({}).remove(function () {
  console.log('Deleted games');
});

User.find({}, function (err, docs) {
  if (docs.length) {return;}
  User.create({
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, {
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    name: 'SERVER',
    email: 'server@iamdb.io',
    password: '!QAZ1qaz'
  }, function () {
    console.log('Populated default users');
  });
});
