const express = require("express");
const router = express.Router();
const knex = require("../../../utils/dbConfig");
const { addProduct, getCategories } = require("../../../controllers/products");

router.get("/", getCategories);
router.post("/", addProduct);

router.get("/", (req, res) => {
  knex("products")
    .select("id", "name")
    .then((row) => {
      res.json(row);
    })
    .catch((err) => {
      res.status(400).send("Unable to get datas");
    });
});
module.exports = router;
