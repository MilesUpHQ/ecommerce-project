var express = require("express");
var router = express.Router();
const db = require("../utils/dbConfig");

router.get("/search", (req, res) => {
  try {
    db("products as p")
      .leftJoin("product_categories as c", "p.category_id", "c.id")
      .leftJoin("variants", "variants.product_id", "p.id")
      .select(
        "p.id",
        "p.category_id",
        "p.name as name",
        "p.description",
        "c.name as category",
        "variants.price"
      )
      .where("p.name", "ILIKE", `%${req.query.search_keyword.toLowerCase()}%`)
      .orWhere("p.description", "ILIKE", `%${req.query.search_keyword.toLowerCase()}%`)
      .orWhere("c.name", "ILIKE", `%${req.query.search_keyword.toLowerCase()}%`)
      .then((row) => {
        res.json(row)
      })
      .catch(err => console.log(err))
  } catch (err) {
    console.log(err);
  }
});


router.get("/search/:categoryId", (req, res) => {
  try {
    db("products as p")
      .leftJoin("product_categories as c", "p.category_id", "c.id")
      .leftJoin("variants", "variants.product_id", "p.id")
      .select(
        "p.id",
        "p.category_id",
        "p.name as name",
        "p.description",
        "c.name as category",
        "variants.price"
      )
      .where("c.id", req.params.categoryId)
      .andWhere("p.name", "ILIKE", `%${req.query.search_keyword.toLowerCase()}%`)
      .then((row) => {
        res.json(row)
      })
      .catch(err => console.log(err))
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
