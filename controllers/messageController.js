const Message = require("../models/Message");

const messageController = {
  getUserMessages: async (req, res) => {
    // get currUser id from payload
    const { _id } = req.userPayload;
    let msgs;
    // find all messages where receiver || sender === id
    // and sort by their timestamps
    try {
      msgs = await Message.find({
        $or: [{ sender: _id }, { recipient: _id }],
      }).sort({ createdAt: 1 });
      res.send(msgs);
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = messageController;
