const express = require("express");
const router = express.Router();
const knex = require("../../utils/dbConfig");
const bcrypt = require("bcryptjs");
const transporter = require("../../utils/nodemailer");
const client = require("../../utils/mailGun");

router.put("/", async (req, res, next) => {
  knex("users")
    .where("email", req.body.email)
    .then(async (result) => {
      if (result.length == 0) {
        res.status(404).send("E-mail does not exists");
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        knex("users")
          .returning("id", "username", "email")
          .where("email", req.body.email)
          .update({ password_digest: hashedPassword })
          .then((row) => {
            const messageData = {
              from: process.env.GMAIL_AUTH_USER,
              to: req.body.email,
              subject: "Reset password successfull",
              text:
                "Your request for reset for password is  sucessfull  \n\n" +
                "Please login into your account now!@@" +
                "If it is not you ,Please check it out\n",
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

            res.status(200).json(row[0]);
          })
          .catch((err) => {
            res.status(505).json(err);
          });
      }
    });
});

module.exports = router;
