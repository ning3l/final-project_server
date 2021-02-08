const express = require("express");
const router = express.Router();
const authorizeUser = require("../middleware/authorizeUser");
const Message = require("../models/Message");

// CREATE NEW MESSAGE
router.post("/:id", authorizeUser, async (req, res) => {
  // get sender id from payload
  const { _id } = req.userPayload;
  // get receiver id from params
  const { id } = req.params;
  //const userId = "5ff8414e3c18806429ba0cb9";
  let msg;
  try {
    msg = new Message({
      text: req.body.text,
      sender: _id,
      recipient: id,
    });
    await msg.save();
    res.send(msg);
  } catch (err) {
    console.log(err);
  }
});

// GET ALL MESSAGES BELONGING TO CURR USER
router.get("/", authorizeUser, async (req, res) => {
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
});

module.exports = router;
