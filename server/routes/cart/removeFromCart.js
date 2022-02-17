// detele items from cart by id
const express = require("express");
const router = express.Router();
const knex = require("../../utils/dbConfig");
const passport = require("passport");

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    knex("cart_items")
      .where({ id: req.params.id })
      .del()
      .then((row) => {
        res.json(row);
      })
      .catch((err) => {
        res.status(400).send("Unable to delete item from cart ");
      });
  }
);
module.exports = router;
