'use strict';

angular.module('iamdbApp')
  .service('util', util);

function util () {
  var utils = {
    addOrReplace: function (collection, newItem, query) {
      var index = _.findIndex(collection, query);
      if (index === -1) {
        collection.push(newItem);
        return collection;
      }
      collection.splice(index, 1, newItem);
      return collection;
    }
  };

  return _.runInContext().mixin(utils);
}
