const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");
const jwt = require("jsonwebtoken");
const transporter = require("../utils/nodemailer");

const client = require("../utils/mailGun");

router.post("", (req, res) => {
  if (req.body.email == "") {
    res.status(400).send("email required");
  }
  knex("users")
    .where("email", req.body.email)
    .then((result) => {
      if (result.length == 0) {
        res.status(404).send("E-mail does not exists");
      } else {
        const token = jwt.sign({ email: req.body.email }, "jwtSecret", {
          expiresIn: "1hr",
        });

        const messageData = {
          from: process.env.GMAIL_AUTH_USER,
          to: req.body.email,
          subject: "LINK TO RESET PASSWORD",
          text:
            "Please click on the following link to reset ur password : \n\n" +
            `${req.body.link}/reset_password/${token}\n\n` +
            "If you did not requested,Please ignore this one ,JOLLY\n",
        };

        client.messages
          .create(DOMAIN, messageData)
          .then((res) => {
            res.status(200).json("recovery email sent");
            console.log(res);
          })
          .catch((err) => {
            res.status(505).json(err);
            console.error(err);
          });
      }
    });
});

module.exports = router;
