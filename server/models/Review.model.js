const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  text: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "News",
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
