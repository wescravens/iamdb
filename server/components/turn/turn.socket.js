var _ = require('lodash');
var forEachKV = _.rearg(_.forEach, [1, 0]);
var turnService = require('./turn.service');

exports.register = function (socket) {
  var events = {
    'join room': socket.join,
    'start turn': turnService.start,
    'answer turn': turnService.answer,
    'challenge turn': turnService.challenge,
    'search': turnService.search
  };
  forEachKV(events, socket.on);
};
