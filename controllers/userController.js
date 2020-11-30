const User = require("../models/User");
const bcrypt = require("bcrypt");

const userController = {
  createUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      let user = await User.findOne({ username });
      if (user) return res.status(400).send("user already exists!");

      user = new User({ username, password: await bcrypt.hash(password, 10) });
      await user.save();

      //   res.json({ _id: user._id, username: user.username });
      const token = user.createToken();
      res
        .set("x-authorization-token", token)
        .send({ _id: user._id, username: user.username });
    } catch (err) {
      console.log(err.message);
    }
  },
};

module.exports = userController;
