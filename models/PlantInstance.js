const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const add = require("date-fns/add");
const format = require("date-fns/format");
const addDays = require("date-fns/addDays");
var { differenceInDays, isAfter } = require("date-fns");

const plantInstanceSchema = new Schema(
  {
    plant: { type: Schema.Types.ObjectId, ref: "Plant" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    nickname: { type: String },
    waterDate: { type: String },
    waterInterval: { type: String },
    fertilizeDate: { type: String },
    fertilizeInterval: { type: String },
    repotDate: { type: String },
    repotInterval: { type: String },
    happiness: { type: String },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

// CALCULATE CARE CALENDAR
const dateFormat = "MM/dd/yyyy";
let today = Date.now();

function calculateNotification(start, interval) {
  if (!start || !interval) return "N/A";
  if (isAfter(start, today)) return format(start, dateFormat);
  let diff = differenceInDays(today, start) % interval;
  let rest = interval - diff;
  if (rest === interval) return format(today, dateFormat);
  let result = addDays(today, rest);
  return format(result, dateFormat);
}

plantInstanceSchema.virtual("water.date").get(function () {
  let start = Date.parse(new Date(this.waterDate));
  let interval = Number(this.waterInterval);
  return calculateNotification(start, interval);
});

plantInstanceSchema.virtual("fertilize.date").get(function () {
  let start = Date.parse(new Date(this.fertilizeDate));
  let interval = Number(this.fertilizeInterval);
  return calculateNotification(start, interval);
});

plantInstanceSchema.virtual("repot.date").get(function () {
  let start = Date.parse(new Date(this.repotDate));
  let interval = Number(this.repotInterval);
  return calculateNotification(start, interval);
});

module.exports = mongoose.model("PlantInstance", plantInstanceSchema);
