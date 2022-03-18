const express = require("express");
const router = express.Router();
const knex = require("../../utils/dbConfig");

router.get("/:id", async (req, res, next) => {
  // get products by product category with variants
  knex("products")
    .join("product_categories", "products.category_id", "product_categories.id")
    .join("variants", "products.id", "variants.product_id")
    .join("variant_images", "variants.id", "variant_images.variant_id")
    .where("product_categories.id", req.params.id)
    .orWhere("product_categories.parent_id", req.params.id)
    .select(
      "products.id",
      "products.name",
      "products.description",
      "variants.color",
      "variants.size",
      "variants.type",
      "variants.price",
      "variants.id as variant_id",
      "variant_images.image_url"
    )
    .then((row) => {
      res.send(row);
    })
    .catch((err) => {
      res.send("error in getting products");
    });
});

module.exports = router;
