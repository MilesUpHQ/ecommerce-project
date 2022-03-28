const express = require("express");
const router = express.Router();
const knex = require("../../../utils/dbConfig");

function deleteProduct(db, product) {
  let store_variant_id;
  db("variants")
    .select("variants.id")
    .where("product_id", parseInt(product.id))
    .then((rows) => {
      store_variant_id = rows[0].id;
      db("variant_images")
        .delete()
        .where("variant_id", store_variant_id)
        .then((rows) => {
          db("variants")
            .delete()
            .where("id", store_variant_id)
            .then((rows) => {
              db("featured_products")
                .delete()
                .where("id", product.id)
                .then((rows) => {
                  db("products")
                    .delete()
                    .where("id",product.id)
                    .then((rows)=>{
                      rows[0];
                    })
                    return rows[0];
                })
                .catch((err) => {
                  console.log(err);
                })
                .catch((err) => {
                  console.log(err);
                });
              return rows[0];
            })
            .catch((err) => {
              console.log(err);
            });
          return rows[0];
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("ddd");
}

router.get("/", async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  await knex("products")
    .leftJoin("variants", "variants.product_id", "products.id")
    .select(
      "products.id",
      "products.name",
      "products.description as description",
      "variants.id as variantid",
      "variants.size",
      "variants.price"
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

router.delete("/", async (req, res) => {
  try {
    console.log("d", req.query);
    await deleteProduct(knex, { id: req.query.id });
    res.json({ message: "deleted succesfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
