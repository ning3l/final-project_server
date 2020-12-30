const express = require("express");
const router = express.Router();
const authorizeUser = require("../middleware/authorizeUser");
const eventController = require("../controllers/eventController");

// GET ALL EVENTS
router.get("/", eventController.getAllEvents);

// CREATE AN EVENT + ASSIGN TO CREATOR
router.post("/", authorizeUser, eventController.createEvent);

// GET ALL EVENTS CURR USER IS ATTENDING VIA HIS EVENTS ARR
router.get("/me", authorizeUser, eventController.getCurrUserEvents);

// ATTEND EVENT
router.post("/attend", authorizeUser, eventController.attend);

// LEAVE EVENT
router.post("/leave", authorizeUser, eventController.leave);

// CANCEL EVENT
router.delete("/cancel", authorizeUser, eventController.delete);

// to be implemented:
// UPDATE EVENT
router.put("/edit", authorizeUser, (req, res) => {
  // find this specific event in all events
  // overwrite curr data with new data
  // send back updated el
});

module.exports = router;
