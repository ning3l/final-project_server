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

// ATTEND AN EVENT
// push event id to the events arr of user who made the req
// push user id to this event's attendees arr
router.post("/attend", authorizeUser, async (req, res) => {
  console.log("EVENT ID", req.body.eventId);
  const { eventId } = req.body;
  const { _id } = req.userPayload;

  // ACHTUNG: event you send back after attend is not yet populated
  const user = await User.findById(_id);
  const event = await Event.findById({ _id: eventId });
  await event.attendees.push(_id);
  await user.events.push(event);
  await event.save();
  await user.save();
  console.log(event);
  res.send(event);
  // get attendee id from payload & push user in this events attendee array
  //   Event.find()
  //     .then((data) => res.json(data))
  //     .catch((err) => console.log(err.message));
});

// CREATE AN EVENT + ASSIGN TO CREATOR
// push event to user event arr
// whenever you create an event, also push user into attendees array
// delete / update event => check if _id === creator
router.post("/", authorizeUser, async (req, res) => {
  const { _id } = req.userPayload;
  try {
    const user = await User.findById(_id);
    const event = await new Event({
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
    await event.attendees.push(_id); // this does not work ???
    await event.save();
    await user.events.push(event._id);
    await user.save();
    console.log("EVENT ID", event._id);
    res.send(event);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
