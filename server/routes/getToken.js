const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const db = require("../utils/dbConfig");
const bookshelf = require("bookshelf")(db);
const securePassword = require("bookshelf-secure-password");
bookshelf.plugin(securePassword);
const jwt = require("jsonwebtoken");

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
		User.forge({ email: req.body.email })
			.fetch()
			.then((user) => {
				user
					.authenticate(req.body.password)
					.then(() => {
						const payload = { id: user.id };
						const token = jwt.sign(payload, process.env.JWT_SECRET);
						res.json({ token });
					})
					.catch((err) => {
						res.status(400).send(err);
					});
			})
			.catch((err) => {
				res.status(400).send(err);
			});
	}
);
module.exports = router;
