const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");
const Razorpay = require("razorpay");

var razorpay = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY,
  key_secret: process.env.RAZOR_PAY_KEY_SECREAT,
});

////Razor pay***********************//
router.post("/razorpay", async (req, res, next) => {
  const payment_capture = 1;
  const amount = 600 * 100;
  const currency = "INR";

  const options = {
    amount,
    currency,
    payment_capture,
  };
  try {
    const response = await razorpay.orders.create(options);
    console.log("response :", response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log("err ", error);
  }
});

module.exports = router;
