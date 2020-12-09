const User = require("../models/User");

// not currently in use
const userContext = async (req, res, next) => {
  const { username } = req.userPayload;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).send("no such user");
  } else {
    req.user = user;
    next();
  }
};

module.exports = userContext;
