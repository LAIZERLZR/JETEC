const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  products: {
    type: Object,
    default: [],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
