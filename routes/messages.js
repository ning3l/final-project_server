const express = require("express");
const router = express.Router();
const authorizeUser = require("../middleware/authorizeUser");
const messageController = require("../controllers/messageController");

router.get("/", authorizeUser, messageController.getUserMessages);

module.exports = router;
