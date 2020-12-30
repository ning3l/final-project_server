var express = require("express");
var router = express.Router();
const User = require("../models/User");
const userController = require("../controllers/userController");
const authorizeUser = require("../middleware/authorizeUser");
const upload = require("../utils/uploadProfilePic");

// GET ALL USERS
router.get("/", function (req, res, next) {
  User.find()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

// REGISTER A NEW USER
router.post("/register", userController.createUser);

// HANDLE WISHLIST PLANTS FOR CURR LOGGED IN USER
router.post("/wish", authorizeUser, userController.addToWishlist);
//router.get("/wish", authorizeUser, userController.getWishlist); // currently you're getting this from user context on login
router.delete("/wish", authorizeUser, userController.deleteWishlistPlant);

// UPLOAD PROFILE PICTURE
router.post(
  "/upload-profile-pic",
  [authorizeUser, upload.single("profile_pic")],
  userController.uploadPic
);

// app.get("/profile-pic", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

module.exports = router;
