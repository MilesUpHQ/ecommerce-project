const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
var adminRouter = require("./routes/admin/category");
const db = require("./utils/dbConfig");
const port = process.env.NODE_PORT;
const resetPassword = require("./routes/resetPassword");
const forgotPassword = require("./routes/forgotPassword");
dotenv.config();

const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bookshelf = require("bookshelf")(db);
const securePassword = require("bookshelf-secure-password");
bookshelf.plugin(securePassword);
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//routes
app.use("/api/reset_password", resetPassword);
app.use("/api/forgot_password", forgotPassword);
const User = bookshelf.Model.extend({
  tableName: "users",
  hasSecurePassword: true,
});

const opts = {
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
};

const strategy = new JWTStrategy(opts, (jwt_payload, next) => {
	User.forge({ id: jwt_payload.id })
		.fetch()
		.then((res) => {
			next(null, res);
		});
});

app.use(bodyParser.json());
passport.use(strategy);
app.use(passport.initialize());

app.get("/", (req, res) => {
	res.json({ name: "Magesh", company: "Sedin pvt" });
});

app.listen(port, () =>
	console.log(`JS Bootcamp project listening on port ${port}!`)
);

app.use("/", adminRouter);

app.post(
	"/signup",
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
			console.log(errors.errors);
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

app.post(
	"/getToken",
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
						res.status(401).send("Invalid email or password");
					});
			});
	}
);

app.get(
	"/getUser",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.json(req.user);
	}
);

// /admin/products
//   / admin/products/new
// POST / admin / products
//   / admin / categories
// /admin/categories/new
//   / admin / orders
