var express = require("express");
var router = express.Router();
const db = require("../../utils/dbConfig");

router.get("/typeahead", async (req, res) => {
  try {
    const categories = await db("product_categories")
      .select("id", "name")
      .where("name", "ILIKE", `%${req.query.keyword?.toLocaleLowerCase()}%`);
    const products = await db("products")
      .select("id", "name")
      .where("name", "ILIKE", `%${req.query.keyword?.toLocaleLowerCase()}%`);
    let allItems = [...categories, ...products];
    res.json(allItems);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/products", async (req, res) => {
  try {
    const { category_id, keyword } = req.query;

    const parentCategory = await db("product_categories")
      .select("id", "name")
      .where("name", "ILIKE", `%${keyword?.toLowerCase()}%`)
      .then((row) => {
        return row;
      })
      .catch((err) => {
        res.status(500).json(err);
      });

    let searchByProductName = db("products")
      .select("name")
      .whereILike("name", `%${keyword?.toLowerCase()}%`);
    let searchByCategoryName = db("product_categories")
      .select("name")
      .whereILike("name", `%${keyword?.toLowerCase()}%`);

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
        if (category_id) {
          builder
            .where("c.id", category_id)
            .whereIn("products.name", searchByProductName);
        } else {
          parentCategory.length > 0
            ? builder
                .whereIn("products.name", searchByProductName)
                .orWhere("c.parent_id", parentCategory[0].id)
                .orWhereIn("c.name", searchByCategoryName)
            : builder
                .whereIn("products.name", searchByProductName)
                .orWhereIn("c.name", searchByCategoryName);
        }
      })
      .orWhere((builder) => {
        if (category_id) {
          parentCategory.length > 0
            ? builder
                .where("c.id", category_id)
                .andWhere("c.parent_id", parentCategory[0].id)
            : builder
                .where("c.id", category_id)
                .whereIn("c.name", searchByCategoryName);
        }
      })
      .then((row) => {
        res.json({ row });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
