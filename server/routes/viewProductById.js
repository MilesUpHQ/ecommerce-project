const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");

router.get("/:id", (req, res, next) => {
  knex("fetured_products")
    .leftJoin("products", "fetured_products.product_id", "products.id")
    .leftJoin(
      "product_categories",
      "products.category_id",
      "product_categories.id"
    )
    .leftJoin(
      "product_images",
      "fetured_products.product_id",
      "product_images.product_id"
    )
    .select(
      "product_categories.name as category",
      "products.name",
      "products.id as products_id",
      "fetured_products.id as featured_id",
      "products.description",
      "products.price",
      "product_images.image_url",
      "product_images.id as image_id"
    )
    .where({ "products.id": req.params.id })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {});
});

module.exports = router;
