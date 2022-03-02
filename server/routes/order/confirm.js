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
      .join("order_items", "orders.id", "=", "order_items.order_id")
      .join("variants", "order_items.variant_id", "=", "variants.id")
      .join("products", "variants.product_id", "=", "products.id")
      .join("varient_images", "variants.id", "=", "varient_images.variant_id")
      .where({ "orders.id": req.params.order_id })
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
