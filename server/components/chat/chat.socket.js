var util = require('../util');
var chatController = require('./chat.controller');

exports.register = function (socket) {
  util.registerIO(socket, {
    chat: function (chat) {
      if (!chat || !chat.room || !chat.message) return;
      socket.to(chat.room).emit('chat', chat);
      chatController.pushMessage(chat);
    }
  })
};
