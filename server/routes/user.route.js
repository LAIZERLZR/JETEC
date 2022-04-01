const { Router } = require("express");
const { userController } = require("../controllers/user.controller");
const authModdleware = require("../middlewares/auth.middleware");
const router = Router();

router.post("/signup", userController.registration);
router.post("/signin", userController.authorization);

router.get("/user", authModdleware, userController.getUser);
router.get("/user/:id", userController.getUserById);
router.get("/card", authModdleware, userController.getCard);
router.get("/users", authModdleware, userController.getUsers);

router.patch("/upcash", authModdleware, userController.editUserCash);
router.patch(
  "/addProductInTheCard/:id",
  authModdleware,
  userController.AddProductInTheCard
);

router.patch("/clearCard", authModdleware, userController.clearCard);
router.patch("/plusProduct/:id", authModdleware, userController.plusProduct);
router.patch("/minusProduct/:id", authModdleware, userController.minusProduct);
router.patch("/paymentProduct", authModdleware, userController.paymentProducts);
router.patch("/editUser/:id", authModdleware, userController.editUser);

router.delete(
  "/deleteProductInTheCard/:id",
  authModdleware,
  userController.deleteProductInTheCard
);
router.delete("/user/:id", authModdleware, userController.deleteUser);

module.exports = router;
