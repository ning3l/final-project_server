#! /usr/bin/env node

// Script that was used to populate the plant archetypes collection
console.log(
  "Please specify a db as argument - e.g. mongodb+srv://<someUser>:<somePassword>@cluster0.xilkq.mongodb.net/<nameOfDB>?retryWrites=true&w=majority"
);

// get arg from the command line
const userArgs = process.argv.slice(2);
if (!userArgs.length || !userArgs[0].startsWith("mongodb")) {
  console.log("ERROR - pls specify valid mongoDB as arg");
  return;
}

// get data to populate db with
const plantData = require("./data");

// connect to model & db
const Plant = require("../models/Plant");
const mongoose = require("mongoose");
let mongoDB = userArgs[0];

mongoose
  .connect(mongoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("connected!"))
  .catch((err) => console.log(err.message));

const client = mongoose.connection;
client.on("err", (err) => console.log(err.message));

async function instantiatePlant(plantArr) {
  for (let el of plantArr) {
    const plant = await new Plant(el);
    await plant.save(function (err) {
      if (err) return;
    });
    console.log("New Plant" + plant.latin);
  }
}

async function createPlants() {
  try {
    await instantiatePlant(plantData);
  } catch (err) {
    console.log(err);
  }
}

createPlants();
