const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: { type: String },
  description: { type: String },
  date: { type: String },
  address: {
    street: String,
    number: Number,
    city: String,
    zip: Number,
  },
  img: { type: Number },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Event", EventSchema);
