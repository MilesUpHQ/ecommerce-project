const express = require("express");
const router = express.Router();
const knex = require("../../utils/dbConfig");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let cart;
    user_id = req.user.id;
    console.log("req.user", user_id);
    knex("cart")
      .join("cart_items", "cart.id", "cart_items.cart_id")
      .join("variants", "cart_items.variant_id", "variants.id")
      .join("variant_images", "variants.id", "variant_images.variant_id")
      .join("products", "variants.product_id", "products.id")
      .select(
        "products.name",
        "products.id",
        "cart_items.quantity",
        "variants.price",
        "variant_images.image_url",
        "cart.price as total"
      )
      .where({ "cart.user_id": user_id })
      .then((row) => {
        cart = row;
        console.log("cart", cart);
        res.json(cart);
      })
      .catch((err) => {
        res
          .status(500)
          .send("Sorry couldn't load cart. Please refresh and try again ");
      });
  }
);

module.exports = router;
