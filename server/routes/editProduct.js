const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");

router.put("/", (req, res) => {
  console.log("rerdtr", req.body);
  console.log(req.body.id);
  console.log(req.body.categoryid);
  knex("variants")
    .where("product_id", req.body.id)
    .update({
      size: req.body.size,
      color: req.body.color,
      type: req.body.type,
      price: req.body.price,
      product_id: req.body.id,
    })
    .returning("variants.id")
    .then((row) => {
      console.log("Insided", row);
      knex("products")
        .where("id", req.body.id)
        .update({
          name: req.body.name,
          description: req.body.description,
          category_id: req.body.categoryid,
        })
        .returning("products.id")
        .then((row) => {
          res.json(row);
          console.log("congratulations u made it");
        })
        .catch((err) => {
          res.status(400).send("Unable to Post data ");
        });
    })
    .catch((err) => {
      console.log(err);
      // res.status(400).send("Unable to Post data ");
    });
});
module.exports = router;
