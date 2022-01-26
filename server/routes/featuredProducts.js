const express = require("express");
const router = express.Router();
const knex = require("../utils/knex");
console.log("featured products");

router.get("", (req, res, next) => {
  console.log("getting featured products");
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
      "products.id",
      "products.description",
      "products.price",
      "product_images.image_url",
      "product_images.id"
    )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => console.log(err));
});
module.exports = router;
