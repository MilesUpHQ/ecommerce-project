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
      perPage: 10,
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
      res.json({ products, currPage, lastPage, totalPages });
    })
    .catch((err) => {
      res.send("error in getting products");
    });
});

//*********************************************products********************** */
router.post("/add", (req, res) => {
  let name = req.body.name;
  knex("products")
    .where("name", name)
    .then((result) => {
      if (result.length > 0) {
        let product_id = result[0].id;
        knex("featured_products")
          .insert({ product_id: product_id })
          .then((rows) => {
            res.json({ message: "sucessfully added !!" });
          });
      } else {
        res.json({ message: "Product does not exists!!!!!!" });
      }
    })
    .catch((err) => {
      res.json({ message: "Ooops some error in adding product!!!!!!!" });
    });
});

module.exports = router;
