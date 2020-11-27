const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantInstanceSchema = new Schema({
  plant: { type: Schema.Types.ObjectId, ref: "Plant" },
  nickname: { type: String },
  waterdate: { type: String },
  waterInterval: { type: String },
  fertilizeDate: { type: String },
  fertilizeInterval: { type: String },
  repotDate: { type: String },
  repotInterval: { type: String },
  happiness: { type: String },
});

module.exports = mongoose.model("PlantInstance", plantInstanceSchema);
