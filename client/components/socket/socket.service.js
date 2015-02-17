/* global io */
'use strict';

angular.module('iamdbApp')
  .factory('socket', socketService);

function socketService (socketFactory, Auth) {

  // socket.io now auto-configures its connection when we ommit a connection url
  var ioSocket = io('', {
    // Send auth token on connection, you will need to DI the Auth service above
    query: 'token=' + Auth.getToken(),
    path: '/socket.io-client'
  });

  var socket = socketFactory({
    ioSocket: ioSocket
  });

  return {
    socket: socket,

    /**
     * Register listeners to sync an obj with updates on a model
     *
     * Takes the obj we want to sync, the model name that socket updates are sent from,
     * and an optional callback function after new items are updated.
     *
     * @param {String} modelName
     * @param {Object} obj
     * @param {Function} cb
     */
    syncUpdates: function (modelName, cb) {
      cb = cb || angular.noop;
      socket.on(modelName + ':save', cb);
      socket.on(modelName + ':remove', cb);
    },

    /**
     * Removes listeners for a models updates on the socket
     *
     * @param modelName
     */
    unsyncUpdates: function (modelName) {
      socket.removeAllListeners(modelName + ':save');
      socket.removeAllListeners(modelName + ':remove');
    },

    joinRoom: function (name) {
      socket.emit('join room', name);
    }
  };
}
