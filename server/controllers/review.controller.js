const Review = require("../models/Review.model");

module.exports.reviewController = {
  createReview: async (req, res) => {
    try {
      const { text, productId } = req.body;
      const createReview = await Review.create({
        text,
        userId: req.user.id,
        productId,
      });
      res.json(createReview);
    } catch (error) {
      res.json(error);
    }
  },
  editReview: async (req, res) => {
    try {
      const { text, productId } = req.body;
      const createReview = await Review.findByIdAndUpdate(req.params.id, {
        userId: req.user.id,
        productId,
        text,
      });
      res.json(createReview);
    } catch (error) {
      res.json(error);
    }
  },
  deleteReview: async (req, res) => {
    try {
      const deleteReview = await Review.findByIdAndDelete(req.params.id);
      res.json(deleteReview);
    } catch (error) {
      console.log(error);
    }
  },
  getReview: async (req, res) => {
    try {
      const review = await Review.find();
      res.json(review);
    } catch (error) {
      console.log(error);
    }
  },
  getReviewById: async (req, res) => {
    try {
      const getReviewById = await Review.findById(req.params.id);
      res, json(getReviewById);
    } catch (error) {
      console.log(error);
    }
  },
};
