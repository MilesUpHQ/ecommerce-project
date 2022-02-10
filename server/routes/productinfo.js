const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");

router.get("/:id", (req, res) => {
    knex("products")
      .leftJoin("variants", "variants.product_id", "products.id")
      .select("products.id","products.name","variants.size","variants.color",
      "variants.type", "variants.price","products.description")
      .where("products.id",req.params.id)
      .then((row) => {
        res.json(row[0]);
      })
      .catch((err) => {
        res.status(400).send("Unable to display products");
      });
  });
module.exports = router;
