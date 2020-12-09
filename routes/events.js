const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const authorizeUser = require("../middleware/authorizeUser");
const User = require("../models/User");
const { isYesterday } = require("date-fns");

// GET ALL EVENTS
router.get("/", (req, res) => {
  Event.find()
    .then((data) => res.json(data))
    .catch((err) => console.log(err.message));
});

// GET ALL EVENTS CURR USER IS ATTENDING VIA HIS EVENTS ARR
router.get("/me", authorizeUser, async (req, res) => {
  const { _id, username } = req.userPayload;
  let userEvents;
  try {
    userEvents = await User.findById(_id, "events").populate("events", Event);
    console.log(userEvents);
    res.send(userEvents);
  } catch (err) {
    console.log(err);
  }
});

// CREATE AN EVENT + ASSIGN TO CREATOR
router.post("/", authorizeUser, async (req, res) => {
  const { _id, username } = req.userPayload;
  try {
    const user = await User.findById(_id);
    const event = await new Event({
      host: username,
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      address: {
        street: req.body.street,
        number: req.body.number,
        zip: req.body.zip,
        city: req.body.city,
      },
      img: req.body.img,
      creator: _id,
    });
    await event.attendees.push(_id);
    await event.save();
    await user.events.push(event._id);
    await user.save();
    console.log("EVENT ID", event._id);
    res.send(event);
  } catch (err) {
    console.log(err.message);
  }
});

// ATTEND EVENT
router.post("/attend", authorizeUser, async (req, res) => {
  console.log("EVENT ID", req.body.eventId);
  const { eventId } = req.body;
  const { _id } = req.userPayload;
  const user = await User.findById(_id);
  const event = await Event.findById({ _id: eventId });
  await event.attendees.push(_id);
  await user.events.push(event);
  await event.save();
  await user.save();
  console.log(event);
  res.send(event);
});

// LEAVE EVENT
router.post("/leave", authorizeUser, async (req, res) => {
  const { eventId } = req.body;
  const { _id, username } = req.userPayload;
  console.log(_id);
  try {
    // this ain't doin' shit for some reason
    await Event.findById(eventId).updateMany({
      $pull: { attendees: { _id } },
    });
    // this works fine
    await User.findOne({ username }).updateOne({
      $pull: { events: eventId },
    });
    res.send(eventId);
  } catch (err) {
    console.log(err.message);
  }
});

// CANCEL EVENT

// UPDATE EVENT

module.exports = router;
