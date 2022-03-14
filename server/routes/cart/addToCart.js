const express = require("express");
const router = express.Router();
const knex = require("../../utils/dbConfig");
const passport = require("passport");
const {
  insertOrderCart,

  getOrderCartBy,
  insertOrderItems,
} = require("../../queries/order");
router.get(
  "/:variant_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    user_id = req.user.id;
    let quantity = req.body.quantity;
    if (req.body.quantity === undefined || req.body.quantity === null) {
      quantity = 1;
    } else {
      quantity = parseInt(req.body.quantity);
    }
    console.log("req.user", user_id);
    console.log("quantity", quantity);

    getOrderCartBy("user_id", user_id).then((row) => {
      if (row.length === 0) {
        console.log("row", row);
        insertOrderCart(user_id, "cart").then((row) => {
          insertOrderItems(row[0].id, req.params.variant_id, quantity)
            .then((row) => {
              res.json(row);
            })
            .catch((err) => {
              console.log("err", err);
              res.status(500).json(err);
            });
        });
      } else {
        console.log("row1", row);
        const order_id = row[0].id;
        knex("order_items")
          .where({ order_id: row[0].id, variant_id: req.params.variant_id })
          .then((row) => {
            if (row.length === 0) {
              console.log("row", row);
              insertOrderItems(order_id, req.params.variant_id, quantity).then(
                (row) => {
                  res.json(row);
                }
              );
            } else {
              knex("order_items")
                .where({ order_id: order_id })
                .andWhere({ variant_id: req.params.variant_id })
                .update({ quantity: row[0].quantity + quantity })
                .then((row) => {
                  res.json(row);
                });
            }
          });
      }
    });
  }
);

module.exports = router;
