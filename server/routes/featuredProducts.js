const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");

router.get("", (req, res, next) => {
  let page = parseInt(req.query.page) || 1;
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
      "products.id as product_id",
      "products.description",
      "products.price",
      "product_images.image_url",
      "product_images.id"
    )
    .orderBy("products.updated_at", "desc")
    .paginate({
      perPage: 4,
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
    .catch((err) => {});
});
module.exports = router;
