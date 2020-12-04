const User = require("../models/User");
const bcrypt = require("bcrypt");

const authenticationController = {
  login: async (req, res) => {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    console.log("USER", user);
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
};

module.exports = authenticationController;
