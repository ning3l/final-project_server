const express = require("express");
const router = express.Router();
const plantController = require("../controllers/plantController");
const authorizeUser = require("../middleware/authorizeUser");

// GET ALL PLANT ARCHETYPES FOR PLANT INDEX
router.get("/", plantController.getAllPlants);

// HANDLE PLANT INSTANCES OWNED BY CURR USER
router.delete("/del", authorizeUser, plantController.deletePlantInstance);
router.put("/update", authorizeUser, plantController.updatePlantInstance);
router.get("/repository/me", authorizeUser, plantController.getAllRepo); // get curr user's plants

// GET SPECIFIC ARCHETYPE FOR DETAILS
router.get("/:id", plantController.getSinglePlant);

// CREATE NEW INSTANCE FROM WITHIN PLANT INDEX
router.post("/:id", authorizeUser, plantController.createPlantInstance);

module.exports = router;
