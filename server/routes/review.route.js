const { reviewController } = require("../controllers/review.controller");
const { Router } = require("express");
const router = Router();
const authWiddlewares = require("../middlewares/auth.middleware");

router.post("/review", authWiddlewares, reviewController.createReview);
router.patch("/review/:id", authWiddlewares, reviewController.editReview);
router.delete("/review/:id", authWiddlewares, reviewController.deleteReview);
router.get("/review", reviewController.getReview);
router.get("/review/:id", authWiddlewares, reviewController.getReviewById);

module.exports = router;
