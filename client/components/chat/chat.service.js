'use strict';

angular.module('iamdbApp')
  .factory('chat', Chat);

function Chat(
  $stateParams,
  socket,
  Auth
){
  var sock = socket.socket;
  var currentUser = Auth.getCurrentUser();
  var room = $stateParams.id;

  return {
    send: function (message) {
      sock.emit('chat', {
        message: message,
        room: room,
        user: currentUser
      });
    },

    listen: function (arr) {
      sock.removeListener('chat');
      sock.on('chat', function (chat) {
        console.log('got chat', chat);
        arr.unshift(chat);
      });
    }
  };
}
