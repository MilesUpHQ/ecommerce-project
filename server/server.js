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
const path = require("path");

// routes imports
var adminRouter = require("./routes/admin/category");
const resetPassword = require("./routes/resetPassword");
const forgotPassword = require("./routes/forgotPassword");
const addProducts = require("./routes/addProducts");
const displayProducts = require("./routes/displayProducts");
const productinfo = require("./routes/productinfo");
const products = require("./routes/products");
const productsByCategory = require("./routes/productsByCategory");
const signup = require("./routes/signup");
const getToken = require("./routes/getToken");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//routes
app.use("/api/reset_password", resetPassword);
app.use("/api/forgot_password", forgotPassword);
app.use("/api/products", products);
app.use("/api/admin/add_products", addProducts);
app.use("/api", adminRouter);
app.use("/api/admin/products", displayProducts);
app.use("/api/products/category", productsByCategory);
app.use('/api/delete_product',displayProducts);
app.use('/api/product_info',productinfo);

app.use(bodyParser.json());
passport.use(strategy);
app.use(passport.initialize());
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use("/images", express.static(path.join("backend/images")));

app.get("/", (req, res) => {
  res.json({ name: "Magesh", company: "Sedin pvt" });
});

app.listen(port, () =>
  console.log(`JS Bootcamp project listening on port ${port}!`)
);
app.use("/", adminRouter);
app.use("/api/signup", signup);
app.use("/api/getToken", getToken);

app.get(
  "/api/getUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);
