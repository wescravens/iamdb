'use strict';

var _ = require('lodash');
var mixins = {
  registerIO: function (subject, events) {
    _.forEach(events, function (value, key) {
      subject.on(key.toString(), value);
    });
  }
};

module.exports = _.runInContext().mixin(mixins);
