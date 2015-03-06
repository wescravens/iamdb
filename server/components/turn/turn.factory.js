var comb = require('comb');
var tmdbService = require('../tmdb/tmdb.service');
var difference = comb.date.difference;

exports = function (options) {
  return new Turn(options);
};

var Turn = comb.define({
  instance: {
    duration: 35000, // extra 5 seconds to account for socket lag
    startTime: null,
    valid: false,
    character: null,
    pending: true,
    result: '',
    constructor: function (options) {
      this.game = options.game;
      this.player = options.player;
      this.subject = options.subject;
      this.input = options.input;
      this.isActor = options.isActor || false;
      this.deferred = new comb.Promise();
      this.promise = this.deferred.promise();
    },
    start: function () {
      this.startTime = new Date();
      this.timeout = setTimeout(this.end, this.duration);
      return this.promise;
    },
    end: function (reason) {
      reason = reason || 'timeout';
      this.pending = false;
      clearTimeout(this.timeout);
      this.result = reason;
      this.deferred.callback(this);
    },
    clientTimeHasElapsed: function (date) {
      return difference(date, this.startTime, 'millisecond') >= this.duration;
    }
  }
});

