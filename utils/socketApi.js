let socket = require("socket.io");
let io = socket();
let socketApi = {};

io.on("connection", (socket) => {
  // get static id from currUser
  const id = socket.handshake.query.id;
  socket.join();

  socket.on("send-message", ({ recipient, text }) => {
    console.log("sending sth to", recipient);

    socket.broadcast.to(recipient.id).emit("receive-message", {
      recipient,
      sender: id,
      text,
    });
  });
});

socketApi.io = io;
module.exports = socketApi;
