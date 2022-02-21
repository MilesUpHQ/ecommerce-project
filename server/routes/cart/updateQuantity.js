// detele items from cart by id
const express = require("express");
const router = express.Router();
const knex = require("../../utils/dbConfig");
const passport = require("passport");

router.put("/:id", (req, res) => {
  console.log("Update Item");
  console.log(req.params.id);
  console.log(req.body.quantity);

  knex("cart_items")
    .where({ id: req.params.id })
    .update({ quantity: req.body.quantity })
    .then((row) => {
      res.json(row);
    })
    .catch((err) => {
      res.status(400).send("Unable to update item in cart ");
    });
});
module.exports = router;
