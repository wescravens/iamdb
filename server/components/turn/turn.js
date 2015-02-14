var comb = require('comb');
var tmdbService = require('../tmdb/tmdb.service');
var difference = comb.date.difference;

exports.Turn = comb.define({
  instance: {
    _duration: 30000,
    _startTime: null,
    _valid: false,
    _character: null,
    constructor: function (options) {
      this._player = options.player || '';
      this._subject = options.subject || 0;
      this._input = options.input || 0;
      this._isActor = options.isActor || false;
      this._deferred = new comb.Promise();
      this._promise = this._defer.promise();
    },
    start: function () {
      this._startTime = new Date();
      this._timeout = setTimeout(this.end, this._duration);
    },
    end: function () {
      this._deferred.callback();
    },
    hasClientTimeElapsed: function (date) {
      // return true to stop turn
      if (!date || !date instanceof Date) return true;
      return difference(date, this._startTime, 'millisecond') >= this._duration;
    },
  }
});

