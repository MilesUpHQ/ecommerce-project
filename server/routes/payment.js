const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");
const payment = require("../utils/paymentGateway");

let options;
let payment_capture;
let currency;
////Razor pay***********************//
router.post("/:user_id", async (req, res, next) => {
  let amount;
  let order_id;
  knex("orders")
    .select("orders.id", "orders.total_price")
    .where("orders.user_id", req.params.user_id)
    .then(async (response) => {
      order_id = response[0].id;
      amount = response[0].total_price * 100;
      payment_capture = 1;
      currency = "INR";
      options = {
        amount,
        currency,
        payment_capture,
      };
      try {
        const razorResult = await payment.orders.create(options);
        res.json({
          order_id: order_id,
          razor_order_id: razorResult.id,
          currency: razorResult.currency,
          amount: razorResult.amount,
        });
      } catch (error) {
        res.json({ message: "error in razor pay" });
      }
    })
    .catch((err) => {
      res.json({ message: "error in razor pay" });
    });
});

module.exports = router;
