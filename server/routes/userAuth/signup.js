const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const db = require("../../utils/dbConfig");
const { insertUser, getUserByFieldName } = require("../../queries/user");

const userValidation = [
  body("email", "Email is not valid").isEmail(),
  body("password", "Password must be at least 4 characters long").isLength({
    min: 4,
  }),
  body("username", "Username cannot be blank").notEmpty(),
  body("first_name", "First name cannot be blank").notEmpty(),
  body("last_name", "Last name cannot be blank").notEmpty(),
];

router.post("/", ...userValidation, (req, res) => {
  const errors = validationResult(req);
  if (errors.errors.length > 0) {
    res.status(400).json(errors.errors);
    return;
  }
  getUserByFieldName("email", req.body.email)
    .then((user) => {
      if (user.length > 0) {
        res.status(400).json({
          message: "Email already exists",
        });
        return;
      } else {
        getUserByFieldName("username", req.body.username).then((user) => {
          if (user.length > 0) {
            res.status(400).json({
              message: "Username already exists",
            });
            return;
          } else {
            insertUser(req.body)
              .then((user) => {
                res.status(201).json(user);
              })
              .catch((err) => {
                res.status(500).json(err);
              });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error creating user",
        error: err,
      });
    });
});
module.exports = router;
