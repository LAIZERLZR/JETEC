const { Router } = require("express");
const router = Router();
const User = require("./user.route");
const Product = require("./product.route");
const Category = require("./category.route");
const Review = require("./review.route");

router.use(User);
router.use(Product);
router.use(Category);
router.use(Review);

module.exports = router;
