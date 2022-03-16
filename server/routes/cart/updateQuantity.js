// detele items from cart by id
const express = require("express");
const router = express.Router();
const knex = require("../../utils/dbConfig");
const passport = require("passport");

router.put("/:id", (req, res) => {
  knex("order_items")
    .where({ id: req.params.id })
    .update({ quantity: req.body.quantity })
    .then((row) => {
      res.json(row);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).send("Unable to update item in cart ");
    });
});
module.exports = router;
