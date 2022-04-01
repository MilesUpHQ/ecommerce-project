const express = require("express");
const router = express.Router();
const knex = require("../../../utils/dbConfig");

router.get("/:id", (req, res) => {
  knex("products")
  .leftJoin("variants","variants.product_id","products.id")
  .select(
    "products.id",
    "products.name",
    "variants.size",
    "variants.color",
    "variants.type",
    "variants.price",
    "variants.id as variant_id",
    "products.description",

  )
  .where({"variants.product_id":req.params.id})
  .then((row) => {
        console.log("hbh", row);
        res.json(row);
      })
      .catch((err) => {
        res.status(400).send("Unable to send variants");
      });
});
module.exports = router;
