const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const plantInstanceSchema = new Schema({
  plant: { type: Schema.Types.ObjectId, ref: "Plant" },
  nickname: { type: String },
  waterDate: { type: String },
  waterInterval: { type: String },
  fertilizeDate: { type: String },
  fertilizeInterval: { type: String },
  repotDate: { type: String },
  repotInterval: { type: String },
  happiness: { type: String },
});

plantInstanceSchema.virtual("test").get(function () {
  return "test";
  // return DateTime.fromJSDate(this.fertilizeDate).toLocaleString(
  //   DateTime.Date_MED
  // );
});

plantInstanceSchema.methods.getDate = function () {
  return "hi";
};

module.exports = mongoose.model("PlantInstance", plantInstanceSchema);
