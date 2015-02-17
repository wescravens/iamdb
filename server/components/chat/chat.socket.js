

exports.register = function (socket) {
  socket.on('chat', function (chat) {
    console.log('new chat', chat);
  });
};
