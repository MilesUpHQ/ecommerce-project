const express = require("express");
const router = express.Router();
const knex = require("../../../utils/dbConfig");

router.get("/:id", (req, res) => {
  knex("users")
    .leftJoin(
      "address",
      "address.user_id",
      "users.id"
    )
    .select(
      "users.id",
      "users.username",
      "users.email",
      "users.first_name",
      "users.last_name",
      "users.is_admin",
      "users.avatar_url",
      "address.phone",
      "address.street",
      "address.city",
      "address.state",
      "address.pin_code",
      "address.country",
    )
    .where("users.id", req.params.id)
    .then((row) => {
      console.log("hbh", row);
      res.json(row[0]);
    })
    .catch((err) => {
      res.status(400).send("Unable to send products");
    });
});
module.exports = router;
