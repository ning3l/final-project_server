var express = require("express");
var router = express.Router();
const User = require("../models/User");
const userController = require("../controllers/userController");
const authorizeUser = require("../middleware/authorizeUser");
const upload = require("../utils/uploadProfilePic");

/* GET users listing. */
router.get("/", function (req, res, next) {
  User.find()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

// or move to auth routes?
router.post("/register", userController.createUser);

// GET ALL WISHLIST PLANTS FOR CURR LOGGED IN USER
router.post("/wish", authorizeUser, userController.addToWishlist);
router.get("/wish", authorizeUser, userController.getWishlist);
router.delete("/wish", authorizeUser, userController.deleteWishlistPlant);

router.post(
  "/upload-profile-pic",
  [authorizeUser, upload.single("profile_pic")],
  userController.uploadPic
);

// app.get("/profile-pic", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// router.post("/", (req, res) => {
//   const { username, password, plantsitting } = req.body;
//   User.create({ username, password, plantsitting })
//     .then((data) => res.json(data))
//     .catch((err) => console.log(err.message));
// });

module.exports = router;
