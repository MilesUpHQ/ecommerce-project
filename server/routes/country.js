const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");

//**********country **********************//
router.get("", async (req, res, next) => {
  knex("country")
    .select("country.code", "country.name", "country.id")
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.send("error in getting country");
    });
});

module.exports = router;
