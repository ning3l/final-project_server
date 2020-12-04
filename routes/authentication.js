const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authenticationController");
const User = require("../models/User");
const authorizeUser = require("../middleware/authorizeUser");

router.post("/login", authenticationController.login);

router.get("/me", authorizeUser, async (req, res) => {
  const { username } = req.userPayload;
  let user = await User.findOne({ username });
  console.log("USER", user);
  if (!user) {
    return res.status(400).send("Invalid request");
  } else {
    // change this so you don't send the password!
    res.send(user);
    // res.send({
    //   _id: user._id,
    //   username: user.username,
    //   profileImg: user.profileImg,
    //   bio: user.bio,
    //   plantsitting: user.plantsitting,
    //   // repo
    //   // wishlist
    // });
  }
});

module.exports = router;
