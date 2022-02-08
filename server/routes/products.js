const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");

router.get("", async (req, res, next) => {
  let page = parseInt(req.query.page) || 1;

  knex("products")
    .leftJoin("variants", "variants.product_id", "products.id")
    .select("products.name", "products.id", "variants.price")
    .whereNotNull("variants.price")
    .orderBy("products.updated_at", "desc")
    .paginate({
      perPage: 5,
      currentPage: page,
      isLengthAware: true,
    })
    .then((response) => {
      let products = response.data;
      let currPage = response.pagination.currentPage;
      let lastPage = response.pagination.lastPage;
      let totalPages = [];
      for (let i = 1; i <= lastPage; i++) {
        if (lastPage - 1 >= 0) {
          totalPages.push(i);
        }
      }
      console.log("products :::::::::::::::", products);
      res.json({ products, currPage, lastPage, totalPages });
    })
    .catch((err) => {
      res.send("error in getting products");
    });
});

//*********************************************products********************** */
router.post("", (req, res) => {
  console.log("posting to featured products ", req.body);
});

module.exports = router;
