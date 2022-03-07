const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");

// ********* payment ******************//
router.post("/payment", async (req, res, next) => {
  knex("payment")
    .insert({
      payment_id: req.body.payment_id,
      status: "payment",
      type: "card",
      order_id: req.body.order_id,
    })
    .then((rows) => {
      res.json({ message: "Sucessfully added !!" });
    })
    .catch((err) => {
      res.json({
        message: "Ooops some error in payment!!!!!!!",
      });
    });
});

//**********************order items*******************************/
router.post("/confirm", async (req, res, next) => {
  knex("orders")
    .insert({
      order_id: req.body.order_id,
      status: "confirmed",
      order_date: req.body.order_date,
      address_id: req.body.address_id,
      user_id: req.body.user_id,
      total_price: req.body.total_price,
    })
    .returning("orders.id")
    .then((rows) => {
      res.json({ message: "Sucessfully added order!!", id: rows[0].id });
    })
    .catch((err) => {
      res.json({
        message: "Ooops some error in placing order!!!!!!!",
      });
    });
});

//******************************************cart details****************************/
router.get("/:user_id/details", async (req, res, next) => {
  knex("cart")
    .leftJoin("cart_items", "cart_items.cart_id", "cart.id")
    .select("cart.id", "cart_items.variant_id", "cart_items.quantity")
    .where("cart.user_id", req.params.user_id)
    .then((response) => {
      res.json(response[0]);
    })
    .catch((err) => {
      res.send("error in getting cart details");
    });
});

// ********************************order items********************//
router.post("/items", async (req, res, next) => {
  knex("order_items")
    .insert({
      order_id: req.body.order_id,
      quantity: req.body.quantity,
      product_id: req.body.variant_id,
    })
    .then((rows) => {
      res.json({ message: "Sucessfully added order items!!" });
    })
    .catch((err) => {
      res.json({
        message: "Ooops some error in adding  order items!!!!!!!",
      });
    });
});

module.exports = router;
