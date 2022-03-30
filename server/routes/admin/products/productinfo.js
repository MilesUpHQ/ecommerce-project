const express = require("express");
const router = express.Router();
const knex = require("../../../utils/dbConfig");

router.get("/:id", (req, res) => {
  knex("products")
    .leftJoin(
      "product_categories",
      "product_categories.id",
      "products.category_id"
    )
    .leftJoin("variants", "variants.product_id", "products.id")
    .leftJoin("variant_images", "variants.id", "variant_images.variant_id")
    .select(
      "product_categories.name as categoryname",
      "product_categories.id as categoryid",
      "products.id",
      "products.name",
      "variants.size",
      "variants.color",
      "variants.type",
      "variants.price",
      "variants.id as variant_id",
      "products.description",
      "variant_images.image_url"
    )
    .where({"variants.id":req.params.id})
    .then((row) => {
      console.log("hbh", row);
      res.json(row[0]);
    })
    .catch((err) => {
      res.status(400).send("Unable to send products");
    });
});
module.exports = router;
