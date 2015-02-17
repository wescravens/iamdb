'use strict';

angular.module('iamdbApp')
  .factory('Search', Search);

function Search ($resource) {
  return $resource('/api/search/:controller', {}, {
    actor: {
      method: 'GET',
      params: {
        controller: 'person'
      }
    },
    movie: {
      method: 'GET',
      params: {
        controller: 'movie'
      }
    },
    configuration: {
      method: 'GET',
      params: {
        controller: 'configuration',
      }
    }
  });
}
