const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  // email: { type: String, min: 8, max: 30, required: true, unique: true },
  username: { type: String, min: 3, max: 30, required: true, unique: true },
  password: { type: String, required: true },
  profileImg: { type: String },
  bio: { type: String },
  plantsitting: { type: Boolean },
  repository: [{ type: Schema.Types.ObjectId, ref: "Plant" }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: "Plant" }],
});

userSchema.methods.createToken = function () {
  const payload = { _id: this._id, username: this.username };
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secretKey);
  return token;
};

module.exports = mongoose.model("User", userSchema);
