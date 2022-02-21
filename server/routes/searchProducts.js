var express = require("express");
var router = express.Router();
const db = require("../utils/dbConfig");

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

// router.get("/filter-products/:id", (req, res) => {
//   try {
//     let priceRange = JSON.parse(req.query.prices_range);
//     if (!req.query.prices_range || req.query.prices_range.length == 2) {
//       db("products as p")
//         .leftJoin("product_categories as c", "p.category_id", "c.id")
//         .leftJoin("variants", "variants.product_id", "p.id")
//         .leftJoin("variant_images", "variants.id", "variant_images.variant_id")
//         .select(
//           "p.id",
//           "p.category_id",
//           "p.name as name",
//           "p.description",
//           "c.name as category",
//           "variants.price",
//           "variant_images.image_url"
//         )
//         .where("p.category_id", req.params.id)
//         .then((row) => {
//           res.json(row);
//         })
//         .catch((err) => {
//           res.send("error in getting products");
//         });
//     } else {
//       db("products")
//         .leftJoin("variants", "products.id", "variants.product_id")
//         .leftJoin("variant_images", "variants.id", "variant_images.variant_id")
//         .where("products.category_id", req.params.id)
// .andWhere("variants.price", ">=", Math.min(...priceRange))
// .andWhere("variants.price", "<=", Math.max(...priceRange))
//         .select(
//           "products.id",
//           "products.name",
//           "products.description",
//           "variants.color",
//           "variants.size",
//           "variants.type",
//           "variants.price",
//           "variant_images.image_url"
//         )
//         .then((row) => {
//           res.send(row);
//         })
//         .catch((err) => {
//           res.send("error in getting products");
//         });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

router.get("/filter-products", (req, res) => {
  console.log(req.query);
  let priceRange =
    (req.query.prices_range && JSON.parse(req.query.prices_range)) || null;
  try {
    const { category_id } = req.query;
    db("products")
      .leftJoin("variants", "products.id", "variants.product_id")
      .leftJoin("variant_images", "variants.id", "variant_images.variant_id")
      .leftJoin("product_categories as c", "products.category_id", "c.id")
      .select(
        "products.id",
        "c.id as category_id",
        "c.name as category",
        "products.name",
        "products.description",
        "variants.color",
        "variants.size",
        "variants.type",
        "variants.price",
        "variants.id as variant_id",
        "variant_images.image_url"
      )
      .where((builder) => {
        if (req.query.category_id) {
          builder
            .where("c.id", category_id)
            .andWhere(
              "products.name",
              "ILIKE",
              `%${req.query.search_keyword.toLowerCase()}%`
            );
        } else {
          builder
            .where(
              "products.name",
              "ILIKE",
              `%${req.query.search_keyword.toLowerCase()}%`
            )
            .orWhere(
              "c.name",
              "ILIKE",
              `%${req.query.search_keyword.toLowerCase()}%`
            );
        }
      })
      .orWhere((builder) => {
        if (req.query.category_id) {
          builder
            .where("c.id", category_id)
            .andWhere(
              "c.name",
              "ILIKE",
              `%${req.query.search_keyword.toLowerCase()}%`
            );
        }
      })
      .then((row) => {
        res.json({ row });
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
