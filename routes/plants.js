const express = require("express");
const router = express.Router();
const plantController = require("../controllers/plantController");
const authorizeUser = require("../middleware/authorizeUser");

// ARCHETYPES
router.get("/", plantController.getAllPlants);

// INSTANCES
router.delete("/del", authorizeUser, plantController.deletePlantInstance);
router.get("/repository/me", authorizeUser, plantController.getAllRepo); // filters for user who made req
router.get("/repository", authorizeUser, plantController.getUserRepo); // could give you so else's plants ???

// ARCHETYPES
router.get("/:id", plantController.getSinglePlant);

// INSTANCES
router.post("/:id", authorizeUser, plantController.createPlantInstance);

module.exports = router;
