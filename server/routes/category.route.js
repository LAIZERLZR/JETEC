const { categoryController } = require("../controllers/category.contoller");
const { Router } = require("express");
const router = Router();

router.post("/category", categoryController.createCategory);
router.patch("/category/:id", categoryController.editCategory);
router.delete("/category/:id", categoryController.deleteCategory);
router.get("/category", categoryController.getCategory);
router.get("/category/:id", categoryController.getCategoryById);

module.exports = router;
