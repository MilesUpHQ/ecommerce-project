var express = require("express");
var router = express.Router();
const db = require("../../../utils/dbConfig");

router.get("/", async (req, res) => {
  try {
    db("orders as o")
      .leftJoin("users as u", "u.id", "o.user_id")
      .select(
        "o.id",
        "o.total_price",
        "o.status",
        "o.order_id",
        "o.order_date",
        "u.username"
      )
      .orderBy("o.updated_at", "desc")
      .then((row) => {
        res.json(row);
      })
      .catch((err) => {
        res.json('Something went wrong', err);
      });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:orderId", async (req, res) => {
  try {
    const orderDetails = await db("orders as o")
      .leftJoin("address as a", "o.address_id", "a.id")
      .where("o.id", req.params.orderId)
      .select("o.*", "a.*");

    const orderItems = await db("order_items as items")
      .leftJoin("products as p", "items.product_id", "p.id")
      .leftJoin("variants as v", "p.id", "v.product_id")
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
    console.log(err);
    res.json(err);
  }
});

module.exports = router;
