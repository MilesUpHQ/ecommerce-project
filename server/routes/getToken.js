const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const db = require("../utils/dbConfig");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");
router.post(
  "/",
  body("email", "Email is not valid").isEmail(),
  body("password", "Password must be at least 4 characters long").isLength({
    min: 4,
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (errors.errors.length > 0) {
      res.status(400).json(errors.errors);
      return;
    }

    db("users")
      .where({ email: req.body.email })
      .then((user) => {
        if (user.length === 0) {
          res.status(400).json({
            message: "Email does not exist",
          });
          return;
        }

        let hash = user[0].password_digest;
        bcrypt.compare(req.body.password, hash, (err, result) => {
          if (err) {
            res.status(400).json(err);
            return;
          }

          if (result) {
            const payload = { id: user[0].id };
            const token = jwt.sign(payload, process.env.JWT_SECRET);
            res.json({ token });
          } else {
            res.status(400).json({
              message: "Password is incorrect",
            });
            return;
          }
        });
      });
  }
);
module.exports = router;
