const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getOrderInfo, getOrderItems } = require("../../controllers/orders");
router.get(
  "/:order_id",
  passport.authenticate("jwt", { session: false }),
  getOrderInfo
);

router.get(
  "/:order_id/items",
  passport.authenticate("jwt", { session: false }),
  getOrderItems
);

module.exports = router;
