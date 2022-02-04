const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");

router.get("/",async (req, res) => {
let page = parseInt(req.query.page) || 1;
  await knex("products")
    .leftJoin("variants", "variants.id", "products.id")
    .select("products.id","products.name", "products.description", "variants.price")
    .paginate({
        perPage: 4,
        currentPage: page,
        isLengthAware: true,
      })
      .then(async (response) => {
        let currPage = response.pagination.currentPage;
        let lastPage = response.pagination.lastPage;
        let totalPages = [];
        for (let i = 1; i <= lastPage; i++) {
          if (lastPage - 1 >= 0) {
            totalPages.push(i);
          }
        }
        console.log(response);
        let products = response.data;
        res.json({ products, currPage, lastPage, totalPages });
          
      })
    // .then((row) => {
    //   res.json(row);
    // })
    .catch((err) => {
      res.status(400).send("Unable to display products");
    });
});
module.exports = router;
