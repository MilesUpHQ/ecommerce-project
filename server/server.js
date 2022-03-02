const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./utils/dbConfig");
const port = process.env.NODE_PORT;
const passport = require("passport");
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
const featuredProducts = require("./routes/featuredProducts");
const productinfo = require("./routes/productinfo");
const products = require("./routes/products");
const editProduct = require("./routes/editProduct");
const userList = require("./routes/userList");
const userInfo = require("./routes/userInfo");
const productsByCategory = require("./routes/productsByCategory");
const signup = require("./routes/signup");
const getToken = require("./routes/getToken");
const search = require("./routes/searchProducts");
const address = require("./routes/address");
const cart = require("./routes/cart/cart");
const addToCart = require("./routes/cart/addToCart");
const removeFromCart = require("./routes/cart/removeFromCart");
const updateQuantity = require("./routes/cart/updateQuantity");
const checkout = require("./routes/checkout");
const OrderConfirm = require("./routes/order/confirm");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//routes
app.use("/api/reset_password", resetPassword);
app.use("/api/forgot_password", forgotPassword);
app.use("/api/featured_products", featuredProducts);
app.use("/api/admin/featured_products", featuredProducts);
app.use("/api/admin/products", products);
app.use("/api/user/address/get", address);
app.use("/api/user/address/", address);
app.use("/api/user/new/address/", address);
app.use("/api/user/checkout", checkout);

app.use("/api/signup", signup);
app.use("/api/getToken", getToken);

app.get(
  "/api/getUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);
app.use("/api/products", products);
app.use("/api/admin/products/add", addProducts);
app.use("/api", adminRouter);
app.use("/api/admin/products", displayProducts);
app.use("/api/products/category", productsByCategory);
app.use("/api", search);
app.use("/api/delete_product", displayProducts);
app.use("/api/delete_user", userList);
app.use("/api/admin/product", productinfo);
app.use("/api/admin/product/edit", editProduct);
app.use("/api/admin/userData", userList);
app.use("/api/admin/user", userInfo);
app.use("/api/cart", cart);
app.use("/api/cart/add", addToCart);
app.use("/api/cart/remove", removeFromCart);
app.use("/api/cart/update", updateQuantity);
app.use("/api/order/confirm", OrderConfirm);

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
