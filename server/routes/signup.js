const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const db = require("../utils/dbConfig");
const bookshelf = require("bookshelf")(db);
const securePassword = require("bookshelf-secure-password");
bookshelf.plugin(securePassword);

router.post(
	"/",
	body("email", "Email is not valid").isEmail(),
	body("password", "Password must be at least 4 characters long").isLength({
		min: 4,
	}),
	body("username", "Username cannot be blank").notEmpty(),
	body("first_name", "First name cannot be blank").notEmpty(),
	body("last_name", "Last name cannot be blank").notEmpty(),
	(req, res) => {
		const errors = validationResult(req);
		if (errors.errors.length > 0) {
			res.status(400).json(errors.errors);
			return;
		}
		db("users")
			.where({ email: req.body.email })
			.then((user) => {
				if (user.length > 0) {
					res.status(400).json({
						message: "Email already exists",
					});
					return;
				}
			});
		db("users")
			.where({ username: req.body.username })
			.then((user) => {
				if (user.length > 0) {
					res.status(400).json({
						message: "Username already exists",
					});
					return;
				}
			});

		const user = new User({
			email: req.body.email,
			username: req.body.username,
			password: req.body.password,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
		});
		user
			.save()
			.then(() => {
				res.status(200).send("User created successfully");
			})
			.catch((err) => {
				res.status(400).send("Unable to create user");
			});
	}
);
module.exports = router;
