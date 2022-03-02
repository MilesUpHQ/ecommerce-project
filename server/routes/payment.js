const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");
const Razorpay = require("razorpay");

var razorpay = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY,
  key_secret: process.env.RAZOR_PAY_KEY_SECREAT,
});

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
        const razorResult = await razorpay.orders.create(options);
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
