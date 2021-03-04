let socket = require("socket.io");
let io = socket();
let socketApi = {};

const Message = require("../models/Message");

io.on("connection", (socket) => {
  // get static id from currUser
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", async ({ recipient, text }) => {
    let msg = await Message.create({
      recipient,
      sender: id,
      text,
    });
    socket.broadcast.to(recipient).emit("receive-message", msg);
  });
});

socketApi.io = io;
module.exports = socketApi;
