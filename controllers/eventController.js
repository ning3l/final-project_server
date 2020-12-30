const Event = require("../models/Event");
const User = require("../models/User");

const eventController = {
  getAllEvents: (req, res) => {
    Event.find()
      .then((data) => res.json(data))
      .catch((err) => console.log(err.message));
  },
  getCurrUserEvents: async (req, res) => {
    const { _id } = req.userPayload;
    let userEvents;
    try {
      // search for curr user & send back his populated events arr
      userEvents = await User.findById(_id, "events").populate("events", Event);
      res.send(userEvents);
    } catch (err) {
      console.log(err);
    }
  },
  createEvent: async (req, res) => {
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
      res.send(event);
    } catch (err) {
      console.log(err.message);
    }
  },
  attend: async (req, res) => {
    const { eventId } = req.body;
    const { _id } = req.userPayload;
    const user = await User.findById(_id);
    const event = await Event.findById({ _id: eventId });
    await event.attendees.push(_id);
    await user.events.push(event);
    await event.save();
    await user.save();
    res.send(event);
  },
  leave: async (req, res) => {
    const { eventId } = req.body;
    const { _id, username } = req.userPayload;
    console.log(_id);
    try {
      // pull curr user from the attendees arr of this event
      await Event.findById(eventId).updateMany({
        $pull: { attendees: _id },
      });
      // pull event from curr user events arr
      await User.findOne({ username }).updateOne({
        $pull: { events: eventId },
      });
      res.send(eventId);
    } catch (err) {
      console.log(err.message);
    }
  },
  delete: async (req, res) => {
    const { eventId } = req.body;
    try {
      // find event to be deleted
      let event = await Event.findById(eventId);
      // iterate over this event's attendees arr, find corresponding users and delete event from their event arrs
      for (let id of event.attendees) {
        await User.findById(id).updateOne({
          $pull: { events: eventId },
        });
      }
      // finally delete event from events collection
      await Event.findOneAndRemove({ _id: eventId });
      res.send(event);
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = eventController;
