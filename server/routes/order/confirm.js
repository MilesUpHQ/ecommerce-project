const express = require("express");
const router = express.Router();
const knex = require("../../utils/dbConfig");
const passport = require("passport");

router.get(
  "/:order_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    user_id = req.user.id;
    knex("orders")
      .join("payment", "orders.id", "=", "payment.order_id")
      .join("address", "orders.user_id", "=", "address.user_id")
      .where({
        "orders.id": req.params.order_id,
        "orders.user_id": user_id,
        "orders.status": "placed",
      })
      .then((row) => {
        if (row.length === 0) {
          res.status(400).send("No Orders Found");
        } else {
          res.json(row);
        }
      })
      .catch((err) => {
        res.status(500).json("Unable to fetch orders. Please try again later.");
      });
  }
);

router.get(
  "/:order_id/items",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    user_id = req.user.id;
    knex("orders")
      .join("order_items", "orders.id", "=", "order_items.order_id")
      .join("variants", "order_items.variant_id", "=", "variants.id")
      .join("products", "variants.product_id", "=", "products.id")
      .join("variant_images", "variants.id", "=", "variant_images.variant_id")
      .where({
        "orders.user_id": user_id,
        "orders.id": req.params.order_id,
        "orders.status": "placed",
      })
      .then((row) => {
        if (row.length === 0) {
          res.status(400).send("No Orders Found");
        } else {
          res.json(row);
        }
      });
  }
);

module.exports = router;
