const { response } = require("express");
const Plant = require("../models/Plant");
const PlantInstance = require("../models/PlantInstance");
const User = require("../models/User");

const plantController = {
  getAllPlants: (req, res) => {
    Plant.find()
      .then((data) => res.json(data))
      .catch((err) => console.log(err.message));
  },
  getSinglePlant: (req, res) => {
    const { id } = req.params;
    Plant.findById(id)
      .then((data) => res.json(data))
      .catch((err) => console.log(err.message));
  },
  createPlantInstance: async (req, res) => {
    const { _id } = req.userPayload;
    const { id } = req.params;
    try {
      const user = await User.findById(_id);
      const plantinstance = await new PlantInstance({
        plant: id,
        user: _id,
        nickname: req.body.nickname,
        waterDate: req.body.waterDate,
        waterInterval: req.body.waterInterval,
        fertilizeDate: req.body.fertilizeDate,
        fertilizeInterval: req.body.fertilizeInterval,
        repotDate: req.body.repotDate,
        repotInterval: req.body.repotInterval,
        happiness: req.body.happiness,
      });
      await plantinstance.save();
      await user.repository.push(plantinstance._id);
      await user.save();
      let hi = await PlantInstance.findOne({ _id: plantinstance._id }).populate(
        "plant"
      );
      res.send(hi);
    } catch (err) {
      console.log(err.message);
    }
  },
  // GET REPO FROM CURR LOGGED IN USER
  getAllRepo: (req, res) => {
    const { _id } = req.userPayload;
    PlantInstance.find({ user: _id })
      .populate("plant")
      .then((data) => res.json(data))
      .catch((err) => console.log(err.message));
  },
  // not yet implemented: see another users plant repo
  getUserRepo: async (req, res) => {
    // get username or user _id from req.params
    // let userRepo;
    // try {
    //   userRepo = await User.findById(_id, "repository").populate(
    //     "repository",
    //     PlantInstance
    //   );
    //   res.send(userRepo);
    // } catch (err) {
    //   console.log(err);
    // }
  },
  deletePlantInstance: async (req, res) => {
    try {
      const { username } = req.userPayload;
      const { id } = req.body;
      await User.findOne({ username }).updateOne({
        $pull: { repository: id },
      });
      await PlantInstance.deleteOne({ _id: id });
      res.send(id);
    } catch (err) {
      console.log(err.message);
    }
  },
  updatePlantInstance: async (req, res) => {
    const { selectedPlant } = req.body;
    try {
      let updatedInstance = await PlantInstance.findByIdAndUpdate(
        { _id: selectedPlant._id },
        {
          // nickname: plantUpdateInput.nickname,
          // waterDate: plantUpdateInput.waterDate,
          // waterInterval: plantUpdateInput.waterInterval,
          // fertilizeDate: plantUpdateInput.fertilizeDate,
          // fertilizeInterval: plantUpdateInput.fertilizeInterval,
          // repotDate: plantUpdateInput.repotDate,
          // repotInterval: plantUpdateInput.repotInterval,
          // happiness: plantUpdateInput.happiness,
          nickname: selectedPlant.nickname,
          waterDate: selectedPlant.waterDate,
          waterInterval: selectedPlant.waterInterval,
          fertilizeDate: selectedPlant.fertilizeDate,
          fertilizeInterval: selectedPlant.fertilizeInterval,
          repotDate: selectedPlant.repotDate,
          repotInterval: selectedPlant.repotInterval,
          happiness: selectedPlant.happiness,
        },
        { new: true }
      ).populate("plant");
      res.send(updatedInstance);
    } catch (err) {
      console.log(err.message);
    }
  },
};

module.exports = plantController;
