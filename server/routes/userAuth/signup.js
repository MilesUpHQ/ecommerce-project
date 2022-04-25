const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { signUpUser } = require("../../controllers/signup");
const userValidation = [
  body("email", "Email is not valid").isEmail(),
  body("password", "Password must be at least 4 characters long").isLength({
    min: 4,
  }),
  body("username", "Username cannot be blank").notEmpty(),
  body("first_name", "First name cannot be blank").notEmpty(),
  body("last_name", "Last name cannot be blank").notEmpty(),
];

router.post("/", ...userValidation, signUpUser);
module.exports = router;
