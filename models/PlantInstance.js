const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const add = require("date-fns/add");
const format = require("date-fns/format");
const addDays = require("date-fns/addDays");
var {
  differenceInCalendarDays,
  differenceInDays,
  isAfter,
} = require("date-fns");

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
  let diff = differenceInCalendarDays(today, start);
  let daysUntil = interval - (diff % interval);
  let result = addDays(today, daysUntil);
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

// APPROACH 2: Keeping a reference date
// plantInstanceSchema.virtual("water.date").get(function () {
//   let startDate = new Date(this.waterDate).toLocaleDateString("en-US");
//   // if start === today > switch so that now today is your reference date
//   let referenceDate =
//     new Date(Date.now()).toLocaleDateString("en-US") === startDate
//       ? Date.now()
//       : undefined;
//   let nextWatering = add(referenceDate || Date.parse(startDate), {
//     days: Number(this.waterInterval),
//   });
//   return format(nextWatering, dateFormat);
// });

module.exports = mongoose.model("PlantInstance", plantInstanceSchema);
