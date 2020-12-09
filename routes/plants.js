const express = require("express");
const router = express.Router();
const plantController = require("../controllers/plantController");
const authorizeUser = require("../middleware/authorizeUser");

// GET ALL PLANT ARCHETYPES
router.get("/", plantController.getAllPlants);

// HANDLE PLANT INSTANCES
router.delete("/del", authorizeUser, plantController.deletePlantInstance);
router.put("/update", authorizeUser, plantController.updatePlantInstance);
router.get("/repository/me", authorizeUser, plantController.getAllRepo); // filters for user who made req
router.get("/repository", authorizeUser, plantController.getUserRepo); // could give you so else's plants ???

// GET SPECIFIC ARCHETYPE
router.get("/:id", plantController.getSinglePlant);

// GET SPECIFIC INSTANCE
router.post("/:id", authorizeUser, plantController.createPlantInstance);

module.exports = router;
