'use strict';

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
    }
  });
}

angular.module('iamdbApp')
  .service('Game', GameResource);
