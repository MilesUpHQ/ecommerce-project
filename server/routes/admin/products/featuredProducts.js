const express = require("express");
const router = express.Router();
const knex = require("../../../utils/dbConfig");

router.get("", async (req, res, next) => {
  let page = parseInt(req.query.page) || 1;

  knex("featured_products")
    .leftJoin("products", "featured_products.product_id", "products.id")
    .leftJoin("variants", "variants.product_id", "products.id")
    .leftJoin("variant_images", "variants.id", "variant_images.variant_id")
    .select(
      "featured_products.id",
      "products.name",
      "products.id as product_id",
      "products.description",
      "variants.color",
      "variants.size",
      "variants.type",
      "variants.price",
      "variants.id as variant_id",
      "variant_images.image_url"
    )
    .whereNotNull("variants.price")
    .orderBy("products.updated_at", "desc")
    .paginate({
      perPage: 15,
      currentPage: page,
      isLengthAware: true,
    })
    .then((response) => {
      let featuredProducts = response.data;
      let currPage = response.pagination.currentPage;
      let lastPage = response.pagination.lastPage;
      let totalPages = [];
      for (let i = 1; i <= lastPage; i++) {
        if (lastPage - 1 >= 0) {
          totalPages.push(i);
        }
      }
      res.json({ featuredProducts, currPage, lastPage, totalPages });
    })
    .catch((err) => {
      res.send("error in getting products");
    });
});
//
router.get("/products", async (req, res) => {
  console.log("getting products ::::::::::::::::::::::::::::::::::");
  try {
    const products = await knex("products")
      .select("id", "name")
      .where("name", "ILIKE", `%${req.query.search.toLocaleLowerCase()}%`)
      .limit(5);
    console.log("products :", products);
    res.json(products);
  } catch (err) {
    console.log("errr :", err);
    res.status(401).json({ error: err });
  }
});

// *********************************************** view Product ****************************************

router.get("/:id", async (req, res, next) => {
  knex("featured_products")
    .leftJoin("products", "featured_products.product_id", "products.id")
    .leftJoin("variants", "variants.product_id", "products.id")
    .leftJoin("variant_images", "variants.id", "variant_images.variant_id")
    .select(
      "products.name",
      "products.id as product_id",
      "products.description",
      "variants.color",
      "variants.size",
      "variants.type",
      "variants.price",
      "variants.id as variant_id",
      "variant_images.image_url"
    )
    .where({ "products.id": req.params.id })
    .then((response) => {
      res.json(response[0]);
    })
    .catch((err) => {
      res.send("error in getting product");
    });
});

//**************************************deleting product***************************** */

router.delete("/:id/delete", (req, res) => {
  knex("featured_products")
    .where("id", req.params.id)
    .del(["id"])
    .then((row) => {
      res.json(row[0]);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
