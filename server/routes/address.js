const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");

router.get("/:id", async (req, res, next) => {
  knex("address")
    .leftJoin("users", "address.user_id", "users.id")
    .select(
      "address.id",
      "users.username",
      "users.id as user_id",
      "address.name",
      "address.phone",
      "address.email",
      "address.street",
      "address.state",
      "address.city",
      "address.country",
      "address.pin_code"
    )
    .where("users.id", req.params.id)
    .then((response) => {
      res.json(response);
    });
  // .catch((err) => {
  //   res.send("error in getting address");
  // });
});

// ********* new address ******************//
router.post("", async (req, res, next) => {
  knex("address")
    .insert({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      street: req.body.street,
      city: req.body.city,
      pin_code: req.body.pin_code,
      state: req.body.state,
      country: req.body.country,
      user_id: req.body.user_id,
    })
    .then((rows) => {
      res.json({ message: "sucessfully added !!" });
    });
  // .catch((err) => {
  //   res.json({
  //     message: "Ooops some error in adding address!!!!!!!",
  //   });
  // });
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
router.get("/:id/getById", async (req, res, next) => {
  knex("address")
    .leftJoin("users", "address.user_id", "users.id")
    .select(
      "address.id",
      "users.username",
      "address.name",
      "address.email",
      "address.phone",
      "address.street",
      "address.state",
      "address.city",
      "address.country",
      "address.pin_code"
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
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            street: req.body.street,
            city: req.body.city,
            pin_code: req.body.pin_code,
            state: req.body.state,
            country: req.body.country,
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
