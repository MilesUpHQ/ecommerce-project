const express = require("express");
const router = express.Router();
const knex = require("../../../utils/dbConfig");

router.get("/", async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  await knex("products")
    .select(
      "products.id",
      "products.name",
      "products.description as description",
    )
    .orderBy("products.name", "asc")
    .paginate({
      perPage: 15,
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
      let products = response.data;
      res.json({ products, currPage, lastPage, totalPages });
    })
    .catch((err) => {
      res.status(500).send("Unable to display products");
    });
});

router.delete("/",(req,res)=>{
   knex("products")
   .where({id: req.query.id})
   .del()
     .then((rows) => {
          res.json(rows);
     })
     .catch((err)=>{
       console.log(err);
     })
})

module.exports = router;
