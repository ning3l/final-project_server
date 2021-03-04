const User = require("../models/User");
const Message = require("../models/Message");
const bcrypt = require("bcrypt");

const userController = {
  getAll: (req, res) => {
    User.find()
      .then((data) => res.json(data))
      .catch((err) => console.log(err));
  },
  getSingleUser: async (req, res) => {
    const { id } = req.params;
    try {
      let user = await User.findOne({ _id: id })
        .populate("events")
        .populate({
          path: "repository",
          model: "PlantInstance",
          populate: {
            path: "plant",
            model: "Plant",
          },
        });
      res.send(user);
    } catch (err) {
      console.log(err);
    }
  },
  createUser: async (req, res) => {
    const { username, password, plantsitting, city } = req.body;
    try {
      let user = await User.findOne({ username });
      if (user) return res.status(400).send("user already exists!");
      user = await new User({
        username,
        password: await bcrypt.hash(password, 10),
        plantsitting,
        city,
      });
      await user.save();
      // create a welcome message for each user upon signup:
      let welcome = await Message.create({
        sender: "5ff8406b98a099640853f31a",
        recipient: user._id,
        text:
          "hi there, this is laura - welcome to pl@net! start by browsing our plant catalog, check out upcoming events, or connect with other users by opening a conversation on their profile pages. pls feel free to message me anytime with feedback or suggestions for improvement. happy plant parenting!",
      });
      await welcome.save();
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
  uploadPic: async (req, res) => {
    const { file, fileValidationError } = req;
    const { username } = req.userPayload;
    if (!file) {
      return res.status(400).send("Please upload a file"); // 400 Bad Request
    }
    if (fileValidationError) {
      return res.status(400).send(fileValidationError);
    }
    try {
      await User.update(
        { username: username },
        {
          profileImg: file.filename,
        }
      );
    } catch (err) {
      console.log(err.message);
    }
    res.send({ pathToImage: `/${file.filename}` });
  },
};

module.exports = userController;
