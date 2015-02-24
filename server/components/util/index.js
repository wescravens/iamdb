var _ = require('lodash');
var mixins = {
  forEachKV: _.rearg(_.forEach, [1, 0]),
  registerIO: function (subject, events) {
    mixins.forEachKV(events, subject.on);
  }
};

module.exports = _.runInContext().mixin(mixins);
