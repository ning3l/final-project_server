const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  latin: { type: String, maxlength: 50 },
  common: { type: String, maxlength: 50 },
  srcImg: { type: String, required: true },
  site: { type: String },
  temp: { type: String },
  water: { type: String },
  feeding: { type: String },
  tip: { type: String },
});

module.exports = mongoose.model("Plant", plantSchema);
