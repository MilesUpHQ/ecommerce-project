var express = require("express");
var router = express.Router();
const db = require("../utils/dbConfig");

router.get("/products-by-search", (req, res) => {
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
      .orWhere(
        "p.description",
        "ILIKE",
        `%${req.query.search_keyword.toLowerCase()}%`
      )
      .orWhere("c.name", "ILIKE", `%${req.query.search_keyword.toLowerCase()}%`)
      .then((row) => {
        res.json(row);
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
});

router.get("/typeahead-items", async (req, res) => {
  try {
    const categories = await db("product_categories")
      .select("id", "name")
      .where(
        "name",
        "ILIKE",
        `%${req.query.search_keyword.toLocaleLowerCase()}%`
      );
    const products = await db("products")
      .select("id", "name")
      .where(
        "name",
        "ILIKE",
        `%${req.query.search_keyword.toLocaleLowerCase()}%`
      );
    let allItems = [...categories, ...products];
    res.json(allItems);
  } catch (err) {
    console.log(err);
  }
});

router.get("/filter-products/:id", (req, res) => {
  try {
    let priceRange = JSON.parse(req.query.prices_range);
    if (!req.query.prices_range || req.query.prices_range.length == 2) {
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
        .where("p.category_id", req.params.id)
        .then((row) => {
          res.json(row);
        })
        .catch((err) => {
          res.send("error in getting products");
        });
    } else {
      db("products")
        .leftJoin("variants", "products.id", "variants.product_id")
        .leftJoin("variant_images", "variants.id", "variant_images.variant_id")
        .where("products.category_id", req.params.id)
        .andWhere("variants.price", ">=", Math.min(...priceRange))
        .andWhere("variants.price", "<=", Math.max(...priceRange))
        .select(
          "products.id",
          "products.name",
          "products.description",
          "variants.color",
          "variants.size",
          "variants.type",
          "variants.price",
          "variant_images.image_url"
        )
        .then((row) => {
          res.send(row);
        })
        .catch((err) => {
          res.send("error in getting products");
        });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
