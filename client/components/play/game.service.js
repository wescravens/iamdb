'use strict';

angular.module('iamdbApp')
  .service('Game', GameResource);

function GameResource ($resource) {
  return $resource('/api/games/:name/:controller', {}, {
    join: {
      method: 'PUT',
      params: {
        controller: 'join'
      }
    },
    leave: {
      method: 'PUT',
      params: {
        controller: 'leave'
      }
    },
    update: {
      method: 'PUT'
    },
    validate: {
      method: 'POST',
      controller: 'validate'
    },
    getConfiguration: {
      method: 'GET',
      controller: 'configuration'
    }
  });
}
