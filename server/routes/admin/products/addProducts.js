const express = require("express");
const router = express.Router();
const knex = require("../../../utils/dbConfig");
const { insertProduct } = require("../../../queries/product");

router.get("/", (req, res) => {
  let categories;
  knex("product_categories")
    .select("product_categories.name", "product_categories.id")
    .then((row) => {
      res.json(row);
    })
    .catch((err) => {
      res.send("Sorry couldn't load categories. Please refresh and try again ");
    });
});


router.post("/", (req, res) => {
  insertProduct(req.body)
    .returning("products.id")
    .then((row) => {
      res.json({id:row[0].id});
     })
    .catch((err) => {
      res.status(400).send("Unable to Post data ");
      console.log(err);
    });
});

router.get("/", (req, res) => {
  knex("products")
    .select("id", "name")
    .then((row) => {
      res.json(row);
    })
    .catch((err) => {
      res.status(400).send("Unable to get datas");
    });
});
module.exports = router;
