const Razorpay = require("razorpay");
const payment = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY,
  key_secret: process.env.RAZOR_PAY_KEY_SECREAT,
});

module.exports = payment;
