/* global io */
'use strict';

angular.module('iamdbApp')
  .factory('socket', socketService);

function socketService ($q, socketFactory, Auth, util) {

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
     * @param {Function} cb
     */

    registerIO: function (obj) {
      util.forEach(obj, function (cb, event) {
        socket.on(event, cb);
      });
    },

    deregisterIO: function (obj) {
      util.forEach(arr, function (cb, event) {
        if (!event || (typeof event !== 'string' && typeof cb === 'string'))
          event = cb;
        socket.removeAllListeners(event);
      });
    },

    joinRoom: function (game, player) {
      var dfd = $q.defer();
      socket.emit('game:join', {game: game, player: player}, dfd.resolve);
      return dfd.promise;
    },

    leaveRoom: function (game, player) {
      var dfd = $q.defer();
      socket.emit('game:leave', {game: game, player: player}, dfd.resolve);
      return dfd.promise;
    }
  };
}
