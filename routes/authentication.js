const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authenticationController");
const authorizeUser = require("../middleware/authorizeUser");

router.post("/login", authenticationController.login);
router.get("/me", authorizeUser, authenticationController.context);

module.exports = router;
