const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartQuantity,
  deleteCart,
} = require("../../controllers/cart");

router.get("/", passport.authenticate("jwt", { session: false }), getCart);

router.get(
  "/add/:variant_id",
  passport.authenticate("jwt", { session: false }),
  addToCart
);

router.put("/update/:id", updateCartQuantity);

router.delete(
  "/remove/:id",
  passport.authenticate("jwt", { session: false }),
  deleteCart
);
module.exports = router;
