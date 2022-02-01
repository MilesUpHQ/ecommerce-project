const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./utils/dbConfig");
const port = process.env.NODE_PORT;
const passport = require("passport");
const bookshelf = require("bookshelf")(db);
const securePassword = require("bookshelf-secure-password");
bookshelf.plugin(securePassword);
const bodyParser = require("body-parser");
const strategy = require("./utils/passportStrategy");
dotenv.config();

// routes imports
var adminRouter = require("./routes/admin/category");
const resetPassword = require("./routes/resetPassword");
const forgotPassword = require("./routes/forgotPassword");
const addProducts = require("./routes/addProducts");
const displayProducts = require("./routes/displayProducts");
const signup = require("./routes/signup");
const getToken = require("./routes/getToken");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
passport.use(strategy);
app.use(passport.initialize());

//routes
app.use("/api/reset_password", resetPassword);
app.use("/api/forgot_password", forgotPassword);
app.use("/api/admin/add_products", addProducts);
app.use("/api", adminRouter);
app.use("/api/admin/products", displayProducts);

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

app.listen(port, () =>
  console.log(`JS Bootcamp project listening on port ${port}!`)
);
