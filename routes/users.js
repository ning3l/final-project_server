var express = require("express");
var router = express.Router();
const User = require("../models/User");
const userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  User.find()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

router.post("/", userController.createUser);

// router.post("/", (req, res) => {
//   const { username, password, plantsitting } = req.body;
//   User.create({ username, password, plantsitting })
//     .then((data) => res.json(data))
//     .catch((err) => console.log(err.message));
// });

module.exports = router;
