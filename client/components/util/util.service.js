'use strict';

angular.module('iamdbApp')
  .service('util', util);

function util () {
  var utils = {
    replaceWhere: function (collection, newItem, query) {
      var index = _.findIndex(collection, query);
      collection.splice(index, 1, newItem);
      return collection;
    }
  };

  return _.runInContext().mixin(utils);
}
