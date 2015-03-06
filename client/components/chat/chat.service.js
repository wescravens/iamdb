'use strict';

angular.module('iamdbApp')
  .factory('chat', Chat);

function Chat(
  $stateParams,
  socket,
  toastr,
  Auth
){
  var sock = socket.socket;
  var currentUser = Auth.getCurrentUser();
  var room = $stateParams.id;

  return {
    send: function (message) {
      var chat = {
        message: message,
        room: room,
        user: currentUser
      };
      sock.emit('chat', chat);
      return chat;
    },

    listen: function (arr) {
      removeAllListeners();
      sock.on('chat', function (chat) {
        console.log('new chat', chat);
        toastr.info(chat.message, chat.user.name);
        arr.push(chat);
      });
    }
  };

  function removeAllListeners () {
    sock.removeListener('chat:new');
    sock.removeListener('chat:list');
  }
}
