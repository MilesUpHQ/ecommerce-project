const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");

router.get("/:id", (req, res) => {
    knex("products")
      .leftJoin("variants", "variants.id", "products.id")
      .select("products.name", "products.description","variants.size","variants.color",
      "variants.type", "variants.price")
      .where("products.id",req.params.id)
      .then((row) => {
        res.json(row);
      })
      .catch((err) => {
        res.status(400).send("Unable to display products");
      });
  });
module.exports = router;
