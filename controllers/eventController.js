const Event = require("../models/Event");
const User = require("../models/User");

const eventController = {
  getAllEvents: async (req, res) => {
    Event.find()
      .then((data) => res.json(data))
      .catch((err) => console.log(err.message));
    // not yet implemented: A filter for past events
    // need to be removed from attendees individual event arrays as well !
    // await Event.deleteMany({
    //   date: { $gt: new Date().toJSON().slice(0, 10) },
    // });
  },
  getSingleEvent: async (req, res) => {
    const { id } = req.params;
    let event;
    try {
      event = await Event.findById(id).populate("attendees", User);
      res.send(event);
    } catch (err) {
      console.log(err);
    }
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
        time: req.body.time,
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
    try {
      const user = await User.findById(_id);
      const event = await Event.findById({ _id: eventId });
      await event.attendees.push(_id);
      await user.events.push(event);
      await event.save();
      await user.save();
      res.send(event);
    } catch (err) {
      console.log(err);
    }
  },
  leave: async (req, res) => {
    const { eventId } = req.body;
    const { _id, username } = req.userPayload;
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
  edit: async (req, res) => {
    const { selectedEvent } = req.body;
    try {
      let eventToUpdate = await Event.findByIdAndUpdate(
        { _id: selectedEvent._id },
        {
          title: selectedEvent.title,
          date: selectedEvent.date,
          time: selectedEvent.time,
          description: selectedEvent.description,
          street: selectedEvent.address.street,
          number: selectedEvent.address.number,
          zip: selectedEvent.address.zip,
          city: selectedEvent.address.city,
          img: selectedEvent.img,
        },
        { new: true }
      );
      res.send(eventToUpdate);
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = eventController;
