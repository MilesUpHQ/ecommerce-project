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
  knex("cart")
    .select("cart.id", "cart.price")
    .where("cart.user_id", req.params.user_id)
    .then(async (response) => {
      amount = response[0].price * 100;
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
          id: razorResult.id,
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
