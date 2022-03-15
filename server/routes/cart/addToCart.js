const express = require("express");
const router = express.Router();
const knex = require("../../utils/dbConfig");
const passport = require("passport");
const {
  insertOrderCart,
  getOrderCartBy,
  insertOrderItems,
  updateQuantity,
  getOrderItemsBy,
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
        getOrderItemsBy(row[0].id, req.params.variant_id).then((row) => {
          if (row.length === 0) {
            insertOrderItems(order_id, req.params.variant_id, quantity).then(
              (row) => {
                res.json(row);
              }
            );
          } else {
            updateQuantity(order_id, req.params.variant_id, quantity).then(
              (row) => {
                res.json(row);
              }
            );
          }
        });
      }
    });
  }
);

module.exports = router;
