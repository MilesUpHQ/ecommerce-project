const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");
console.log("get by iddddddddddddddddddddddddddddddddddddddddddddddd");
router.get("/:id", (req, res, next) => {
  console.log("getting featured products by id :::::::::::::", req.params.id);
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
      "fetured_products.product_id as product_id_in_featured product",
      "product_images.product_id as product_id_in_product_images",
      "products.description",
      "products.price",
      "product_images.image_url",
      "product_images.id as image_id"
    )
    .where({ "products.id": req.params.id })
    .then((response) => {
      console.log("respose by id::", response);
      res.json(response);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
