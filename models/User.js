const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  username: { type: String, min: 3, max: 30, required: true, unique: true },
  password: { type: String, required: true },
  profileImg: { type: String, default: "" },
  bio: { type: String, default: "" },
  plantsitting: { type: Boolean, default: false },
  zip: { type: String, default: "" },
  repository: [{ type: Schema.Types.ObjectId, ref: "PlantInstance" }],
  wishlist: [],
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});

userSchema.methods.createToken = function () {
  const payload = { _id: this._id, username: this.username };
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secretKey);
  return token;
};

module.exports = mongoose.model("User", userSchema);
