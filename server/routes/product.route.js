const { Router } = require("express");
const { productController } = require("../controllers/product.controller");
const router = Router();

router.post("/product", productController.createProduct);
router.patch("/product/:id", productController.editProduct);
router.delete("/product/:id", productController.deleteProduct);
router.get("/product", productController.getProduct);
router.get("/product/:id", productController.getProductById);

module.exports = router;
