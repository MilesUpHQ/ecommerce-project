var express = require("express");
var router = express.Router();
const db = require("../../../utils/dbConfig");

router.get("/", async (req, res) => {
  try {
    db("orders as o")
      .leftJoin("users as u", "u.id", "o.user_id")
      .select(
        "o.id as order_id",
        "o.total_price",
        "o.status",
        "o.created_at as order_date",
        "u.username"
      )
      .orderBy("o.updated_at", "desc")
      .then((row) => {
        res.json(row);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:orderId", async (req, res) => {
  try {
    const orderDetails = await db("orders as o")
      .leftJoin("address as a", "o.address_id", "a.id")
      .where("o.id", req.params.orderId)
      .select("o.*", "a.*");

    const orderItems = await db("order_items as items")
      .leftJoin("variants as v", "items.variant_id", "v.id")
      .leftJoin("products as p", "v.product_id", "p.id")
      .where("items.order_id", req.params.orderId)
      .select(
        "items.id",
        "items.quantity",
        "p.id",
        "p.name",
        "v.size",
        "v.color",
        "v.type",
        "v.price"
      );

    const paymentDetails = await db("payment")
      .where("order_id", req.params.orderId)
      .select("id", "payment_id", "type", "status");

    res.json({ orderDetails, orderItems, paymentDetails });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
