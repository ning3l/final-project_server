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
      res.send(user);
    } catch (err) {
      console.log(err.message);
    }
  },
  addToWishlist: async (req, res) => {
    const { username } = req.userPayload;
    const { plantName } = req.body;
    try {
      const user = await User.findOne({ username });
      user.wishlist.push(plantName);
      await user.save();
      res.send(plantName);
    } catch (err) {
      console.log(err);
    }
  },
  getWishlist: async (req, res) => {
    const { username } = req.userPayload;
    try {
      const user = await User.findOne({ username });
      res.send(user.wishlist);
    } catch (err) {
      console.log(err);
    }
  },
  deleteWishlistPlant: async (req, res) => {
    try {
      const { username } = req.userPayload;
      const { name } = req.body;
      await User.findOne({ username }).updateOne({
        $pull: { wishlist: name },
      });
      res.send("success");
    } catch (err) {
      console.log(err.message);
    }
  },
};

module.exports = userController;
