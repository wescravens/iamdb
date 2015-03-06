'use strict';

angular.module('iamdbApp')
  .service('util', util);

function util () {
  var utils = {
    /**
     * Replaces an object in a collection by a given query
     * If the query doesn't return a match, the object is pushed to the end
     * @param  {Array} collection  Array of objects to be mutated
     * @param  {Object} newItem    Object to replace the matched index or pushed
     * @param  {Object} query      Object used to query the collection
     * @return {Array}             Collection is returned for convenience, but the original is mutated.
     */
    pushWhere: function (collection, newItem, query) {
      var index = _.findIndex(collection, query);
      if (index === -1) {
        collection.push(newItem);
        return collection;
      }
      collection.splice(index, 1, newItem);
      return collection;
    },

    /**
     * Removes an object in a collection by a given query
     * If the query doesn't return a match, the collection is unchanged
     * @param  {Array} collection  Array of objects to be mutated
     * @param  {Object} query      Object used to query the collection
     * @return {Array}             Collection is returned for convenience, but the original is mutated.
     */
    pullWhere: function (collection, query) {
      return _.pullAt(collection, _.findIndex(collection, query));
    }
  };

  return _.runInContext().mixin(utils);
}
