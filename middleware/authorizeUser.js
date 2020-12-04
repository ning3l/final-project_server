const jwt = require("jsonwebtoken");

const authorizeUser = (req, res, next) => {
  console.log(req.headers);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("auth header", authHeader);
  console.log("token", token);
  if (!token) {
    res.status(401).send("access denied!");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        console.log(err.message);
        return res.status(403).send("invalid token");
      } else {
        req.userPayload = payload;
        next();
      }
    });
  }
};

module.exports = authorizeUser;
