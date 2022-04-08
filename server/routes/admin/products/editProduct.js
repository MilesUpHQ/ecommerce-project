const express = require("express");
const router = express.Router();
const knex = require("../../../utils/dbConfig");
const db = require("../../../utils/dbConfig");

router.put("/", (req, res) => {
  const pid = req.body.id;
  knex("products")
    .where("id", pid)
    .update({
      name: req.body.name,
      description: req.body.description,
      category_id: req.body.category,
    })
    .then((row) => {
      res.json(row);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id",(req,res)=>{
  knex("products")
  .leftJoin(
        "product_categories",
        "product_categories.id",
        "products.category_id"
      )
      .select(
            "product_categories.name as categoryname",
            "product_categories.id as categoryid",
            "products.id",
            "products.name",
            "products.description",
      )
      .where({"products.id":req.params.id})
    .then((row) => {
      res.json(row[0]);
    })
    .catch((err) => {
      res.status(400).send("Unable to send products");
    });
})

module.exports = router;
