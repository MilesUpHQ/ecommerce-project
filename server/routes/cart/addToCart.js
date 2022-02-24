const express = require("express");
const router = express.Router();
const knex = require("../../utils/dbConfig");
const passport = require("passport");

router.get(
  "/:variant_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    user_id = req.user.id;
    if (req.body.quantity === undefined) {
      req.body.quantity = 1;
    } else {
      req.body.quantity = parseInt(req.body.quantity);
    }
    console.log("req.user", user_id);
    knex("cart")
      .where({ "cart.user_id": user_id })
      .then((row) => {
        if (row.length === 0) {
          knex("cart")
            .insert({ user_id: user_id })
            .returning("id")
            .then((row) => {
              console.log("row", row);
              knex("cart_items")
                .insert({
                  cart_id: row[0],
                  variant_id: req.params.variant_id,
                  quantity: 1,
                })
                .returning("id")
                .then((row) => {
                  res.json(row);
                })
                .catch((err) => {
                  res.status(400).send("Unable to Post data ");
                });
            });
        } else {
          // check if item is already in cart
          knex("cart_items")
            .where({
              cart_id: row[0].id,
              variant_id: req.params.variant_id,
            })
            .then((item) => {
              if (item.length === 0) {
                knex("cart_items")
                  .insert({
                    cart_id: row[0].id,
                    variant_id: req.params.variant_id,
                    quantity: 1,
                  })
                  .returning("id")
                  .then((row) => {
                    res.json(row);
                  });
              } else {
                knex("cart_items")
                  .where({
                    cart_id: row[0].id,
                    variant_id: req.params.variant_id,
                  })
                  .update({ quantity: item[0].quantity + 1 })
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
