var express = require("express");
var router = express.Router();
const User = require("../models/User");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", (req, res) => {
  const { username, email, password, plantsitting } = req.body;
  User.create({ username, email, password, plantsitting })
    .then((data) => res.json(data))
    .catch((err) => console.log(err.message));
});

module.exports = router;
