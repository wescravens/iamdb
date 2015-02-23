exports.register = function (socket) {
  socket.on('chat', function (chat) {
    if (!chat || !chat.room || !chat.message) return;
    console.log('emitting chat %s to room %s', chat.message, chat.room);
    socket.emit('chat', chat.message);
  });
};
