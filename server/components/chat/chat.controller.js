var Game = require('../../api/game/game.model');
var comb = require('comb');

exports.pushMessage = function (messageData) {
  var dfd = new comb.Promise();
  Game.findOne({name: messageData.room}, function(err, game) {
    if (err || !game || game.log == undefined) return dfd.errback({status: 500, error: err});
    game.log.push({
      user: messageData.user._id,
      message: messageData.message,
      timestamp: new Date()
    });
    game.save();
    dfd.callback({status: 200, data: messageData});
  });
  return dfd.promise();
};
