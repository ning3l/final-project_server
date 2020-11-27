const express = require("express");
const router = express.Router();
const plantController = require("../controllers/plantController");

// ARCHETYPES
router.get("/", plantController.getAllPlanst);
router.get("/repository", plantController.getAllRepo);

router.get("/:id", plantController.getSinglePlant);

// INSTANCES
router.post("/:id", plantController.createPlantInstance);

module.exports = router;
