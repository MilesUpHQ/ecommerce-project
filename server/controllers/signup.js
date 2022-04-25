const User = require("../models/user");
const { validationResult } = require("express-validator");

function signUpUser(req, res) {
  const errors = validationResult(req);
  if (errors.errors.length > 0) {
    res.status(400).json(errors.errors);
    return;
  }
  User.findOne({
    where: {
      email: req.body.email,
    },
    orWhere: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (user) {
        res.status(400).json({
          message: "User already exists",
        });
        return;
      }
      User.create({
        email: req.body.email,
        password_digest: req.body.password,
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
      })
        .then((user) => {
          res.json(user);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

module.exports = { signUpUser };
