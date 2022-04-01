const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    requied: true,
  },
  image: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/21/21104.png",
  },
  login: {
    type: String,
    requied: true,
  },
  password: {
    type: String,
    requied: true,
  },
  role: {
    type: String,
    default: "User",
  },
  cash: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
