const express = require("express");
const router = express.Router();
const plantController = require("../controllers/plantController");
const authorizeUser = require("../middleware/authorizeUser");

// ARCHETYPES
router.get("/", plantController.getAllPlanst);

// INSTANCES
router.delete("/del", plantController.deletePlantInstance);
router.get("/repository", plantController.getAllRepo);

// ARCHETYPES
router.get("/:id", plantController.getSinglePlant);

// INSTANCES
router.post("/:id", plantController.createPlantInstance);

// you can now protect routes with your auth middleware
// whenever you make a req on a protected route, it will send
// Authorization: [‘Bearer’, ‘fdngdjglndfjg’]  with it

// this means inside our plantcontroller, we have access to payload obj,
// meaning we now have context about who made the req

// so we can now eg extract the user id, search the database and retrieve
// all plant instances belonging to that user

module.exports = router;
