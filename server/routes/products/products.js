const express = require("express");
const router = express.Router();
const knex = require("../../utils/dbConfig");

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
router.post("", (req, res) => {
  let name = req.body.name;
  knex("featured_products")
    .where({
      product_id: name,
    })
    .then((result) => {
      if (result.length == 0) {
        knex("featured_products")
          .insert({ product_id: name })
          .then((rows) => {
            res.json({ message: "sucessfully added !!" });
          })
          .catch((err) => {
            res.json({
              message: "Ooops some error in adding product!!!!!!!",
            });
          });
      } else {
        res.json({
          message: "product already exists",
        });
      }
    })
    .catch((err) => {});
});
module.exports = router;
