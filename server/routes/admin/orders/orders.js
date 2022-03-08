var express = require("express");
var router = express.Router();
const db = require("../../../utils/dbConfig");

router.get("/orders", async (req, res) => {
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
        res.json(err);
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
