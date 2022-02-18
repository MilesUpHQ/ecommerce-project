const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");

function deleteProduct( db,deleteProduct) {
  return db("variants")
    .delete()
    .where("product_id", deleteProduct.id)
   // .returning("variants.id")
    .then((rows) => {
      console.log("sxxghvgvgjhvjvvhvjhvjhvbjhvhvjhvhvs",variants.id);//this
      db("variant_images")
      .delete()
      .where("variant_id",variants.id)
      .then((rows)=>{ 
       db("products")
       .delete()
       .where("id",deleteProduct.id)
       .then((rows)=>{
         rows[0];
       })
       .catch((err)=>{
         console.log(err);
       })
      return rows[0];
    })
    .catch((err)=>{
      console.log(err);
    })
    return rows[0];
    })
. catch ((err)=> {
  console.log(err);
})
}

router.get("/",async (req, res) => {
let page = parseInt(req.query.page) || 1;
  await knex("products")
    .leftJoin("variants", "variants.product_id", "products.id")
    .select("products.id","products.name", "products.description", "variants.price")
    .orderBy('products.name','asc')
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
      res.status(400).send("Unable to display products");
    });
});

router.delete("/", async (req, res) => {
  try {
    await deleteProduct(knex, { id: req.query.id });
    res.json({ message: "deleted succesfully" });
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: err });
  }
});

module.exports = router;
