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
    syncUpdates: function (modelName, obj, cb) {

      cb = cb || angular.noop;

      /**
       * Syncs item creation/updates on 'model:save'
       */
      socket.on(modelName + ':save', function (item) {
        if (!obj.slice) {
          obj = item;
          cb(item);
          return;
        }

        var oldItem = _.find(obj, {_id: item._id});
        var index = obj.indexOf(oldItem);

        // replace oldItem if it exists
        // otherwise just add item to the collection
        if (oldItem) {
          obj.splice(index, 1, item);
        } else {
          obj.push(item);
        }

        cb(item);
      });

      /**
       * Syncs removed items on 'model:remove'
       */
      socket.on(modelName + ':remove', function (item) {
        _.remove(obj, {_id: item._id});
        cb(event, item, obj);
      });
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
