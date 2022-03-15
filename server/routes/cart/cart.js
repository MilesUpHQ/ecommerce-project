const express = require("express");
const router = express.Router();
const knex = require("../../utils/dbConfig");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    user_id = req.user.id;
    knex("orders")
      .join("order_items", "orders.id", "=", "order_items.order_id")
      .join("variants", "order_items.variant_id", "=", "variants.id")
      .join("products", "variants.product_id", "=", "products.id")
      .join("variant_images", "variants.id", "=", "variant_images.variant_id")
      .where({ "orders.user_id": user_id })
      .andWhere({ "orders.status": "cart" })
      .select(
        "products.name",
        "products.id",
        "order_items.id as cart_id",
        "order_items.quantity",
        "variants.price",
        "variant_images.image_url",
        "orders.total_price as total"
      )
      .then((row) => {
        res.json(row);
      })
      .catch((err) => {
        res
          .status(500)
          .json("Unable to fetch cart items. Please try again later.");
      });
  }
);

module.exports = router;
