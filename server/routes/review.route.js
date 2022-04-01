const { reviewController } = require("../controllers/review.controller");
const { Router } = require("express");
const router = Router();

router.post("/category", reviewController.createReview);
router.patch("/category/:id", reviewController.editReview);
router.delete("/category/:id", reviewController.deleteReview);
router.get("/category", reviewController.getReview);
router.get("/category/:id", reviewController.getReviewById);

module.exports = router;
