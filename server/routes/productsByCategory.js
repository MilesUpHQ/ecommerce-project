const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");

router.get("/:id", async (req, res, next) => {
  // get products by product category with variants
  knex("products")
    .join("variants", "products.id", "variants.product_id")
    .join("variant_images", "variants.id", "variant_images.variant_id")
    .where("products.category_id", req.params.id)
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
});

module.exports = router;
