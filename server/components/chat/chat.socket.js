var util = require('../util');
var chatController = require('./chat.controller');

exports.register = function (socket) {
  util.registerIO(socket, {
    chat: function (chat) {
      if (!chat || !chat.room || !chat.message) return;
      chatController.pushMessage(chat)
        .then(onChatSaveSuccess, onChatSaveError)
      ;

      function onChatSaveSuccess () {
        socket.to(chat.room).emit('chat', chat);
      }

      function onChatSaveError (err) {
        chat.error = err;
        socket.to(chat.room).emit('chat', chat);
      }
    }
  });
};
