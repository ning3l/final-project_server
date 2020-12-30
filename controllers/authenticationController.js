const User = require("../models/User");
const bcrypt = require("bcrypt");

const authenticationController = {
  // ON LOGIN, SET HEADERS
  login: async (req, res) => {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user) {
      console.log("no user was found in db");
      res.status(400).send("invalid credentials!");
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.status(400).send("invalid credentials");
      } else {
        const token = user.createToken();
        res.set("x-authorization-token", token).send("login successful");
      }
    }
  },
  // SUBSEQUENT CALL GETS CONTEXT ABOUT CURR USER
  context: async (req, res) => {
    const { username } = req.userPayload;
    let user = await User.findOne({ username });
    console.log("USER", user);
    if (!user) {
      return res.status(400).send("Invalid request");
    } else {
      res.send({
        _id: user._id,
        username: user.username,
        profileImg: user.profileImg,
        bio: user.bio,
        plantsitting: user.plantsitting,
        wishlist: user.wishlist,
      });
    }
  },
};

module.exports = authenticationController;
