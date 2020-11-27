const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, min: 8, max: 30, required: true, unique: true },
  username: { type: String, min: 3, max: 30, required: true, unique: true },
  password: { type: String, required: true },
  profileImg: { type: String },
  plantsitting: { type: Boolean, required: true },
  repository: [{ type: Schema.Types.ObjectId, ref: "Plant" }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: "Plant" }],
});

module.exports = mongoose.model("User", userSchema);
