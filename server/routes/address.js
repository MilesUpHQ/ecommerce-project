const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");

router.get("", async (req, res, next) => {
  knex("address")
    .leftJoin("users", "address.user_id", "users.id")
    .leftJoin("country", "address.country_id", "country.id")
    .select(
      "address.id",
      "users.username",
      "address.street",
      "address.state",
      "address.city",
      "address.pin_code",
      "country.name as country"
    )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.send("error in getting address");
    });
});

//**********country **********************//
router.get("/country", async (req, res, next) => {
  knex("country")
    .select("country.code", "country.name", "country.id")
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.send("error in getting country");
    });
});

// ********* new address ******************//
router.post("/new", async (req, res, next) => {
  knex("address")
    .insert({
      street: req.body.street,
      city: req.body.city,
      pin_code: req.body.pin_code,
      state: req.body.state,
      country_id: req.body.country_id,
      user_id: req.body.user_id,
    })
    .then((rows) => {
      res.json({ message: "sucessfully added !!" });
    })
    .catch((err) => {
      res.json({
        message: "Ooops some error in adding product!!!!!!!",
      });
    });
});

// ******************delete address******************//
router.delete("/:id/delete", (req, res) => {
  knex("address")
    .where("id", req.params.id)
    .del(["id"])
    .then((row) => {
      res.json(row[0]);
    })
    .catch((err) => {
      res.json(err);
    });
});
//******************************get by id*********************** */
router.get("/:id", async (req, res, next) => {
  knex("address")
    .leftJoin("users", "address.user_id", "users.id")
    .leftJoin("country", "address.country_id", "country.id")
    .select(
      "address.id",
      "users.username",
      "address.street",
      "address.state",
      "address.city",
      "address.pin_code",
      "country.name as country"
    )
    .where({ "address.id": req.params.id })
    .then((response) => {
      res.json(response[0]);
    })
    .catch((err) => {
      res.send("error in getting product");
    });
});

// ************************edit  address****************//
router.put("/:id/edit", (req, res, next) => {
  knex("address")
    .where("id", req.body.id)
    .then(async (result) => {
      if (result.length == 0) {
        res.send("address does not exists");
      } else {
        knex("address")
          .where("id", req.body.id)
          .update({
            street: req.body.street,
            city: req.body.city,
            pin_code: req.body.pin_code,
            state: req.body.state,
            country_id: req.body.country_id,
            user_id: req.body.user_id,
          })
          .then((row) => {
            res.json({ message: "updted successfull" });
          })
          .catch((err) => {
            res.json({ message: "could not update" });
          });
      }
    });
});
module.exports = router;
