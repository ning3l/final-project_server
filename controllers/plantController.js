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
  createPlantInstance: async (req, res) => {
    const { id } = req.params;
    try {
      const plantinstance = new PlantInstance({
        plant: id,
        nickname: req.body.nickname,
        waterdate: req.body.watering,
        waterInterval: req.body.waterInterval,
        fertilizeDate: req.body.fertilizeDate,
        fertilizeInterval: req.body.fertilizeInterval,
        repotDate: req.body.repotDate,
        repotInterval: req.body.repotInterval,
        happiness: req.body.happiness,
      });
      await plantinstance.save();
      res.send(plantinstance);
    } catch (err) {
      console.log(err.message);
    }
  },
  getAllRepo: (req, res) => {
    PlantInstance.find()
      .then((data) => res.json(data))
      .catch((err) => console.log(err.message));
  },
};

module.exports = plantController;
