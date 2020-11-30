const User = require("../models/User");
const bcrypt = require("bcrypt");

const authenticationController = {
  login: async (req, res) => {
    const { username, password } = req.body;

    let user = await User.findOne({ username });
    console.log("USER", user);
    if (!user) {
      res.status(400).send("invalid credentials!");
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.status(400).send("invalid credentials");
      } else {
        const token = user.createToken();
        console.log("success, headers getting set...");
        // res.send(token);
        res.header("Access-Control-Expose-Headers", "ETag");
        res.set("x-authorization-token", token).send("login successful");
      }
    }
  },
};

module.exports = authenticationController;
