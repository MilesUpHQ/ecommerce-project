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
const signup = require("./routes/signup");
const getToken = require("./routes/getToken");
dotenv.config();

const passport = require("passport");
const bookshelf = require("bookshelf")(db);
const securePassword = require("bookshelf-secure-password");
bookshelf.plugin(securePassword);
const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//routes
app.use("/api/reset_password", resetPassword);
app.use("/api/forgot_password", forgotPassword);

const strategy = require("./utils/passportStrategy");
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
app.use("/signup", signup);
app.use("/getToken", getToken);

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
