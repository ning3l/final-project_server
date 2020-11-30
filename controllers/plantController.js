const Plant = require("../models/Plant");
const PlantInstance = require("../models/PlantInstance");

const plantController = {
  getAllPlanst: (req, res) => {
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
  // maybe add these to a separate plant instance controller
  // you need to put them on repo arr of that user
  createPlantInstance: async (req, res) => {
    const { id } = req.params;
    try {
      const plantinstance = new PlantInstance({
        plant: id,
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
      res.send(plantinstance); // build obj and attch more info
    } catch (err) {
      console.log(err.message);
    }
  },
  getAllRepo: (req, res) => {
    PlantInstance.find()
      .populate("plant")
      .then((data) => res.json(data))
      .catch((err) => console.log(err.message));
  },
  deletePlantInstance: (req, res) => {
    const { id } = req.body;
    // delete also from User repo arr ??
    console.log("this is id", id);
    PlantInstance.deleteOne({ _id: id })
      .then((data) => res.json(data))
      .then((err) => console.log(err.message));
    console.log(id);
  },
};

module.exports = plantController;
