const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./utils/dbConfig");
const port =
  process.env.NODE_ENV === "production"
    ? process.env.PORT
    : process.env.NODE_PORT;
const passport = require("passport");
const bodyParser = require("body-parser");
const strategy = require("./utils/passportStrategy");
dotenv.config();
const path = require("path");

// routes imports

const categories = require("./routes/admin/categories/category");
const resetPassword = require("./routes/userAuth/resetPassword");
const forgotPassword = require("./routes/userAuth/forgotPassword");
const addProducts = require("./routes/admin/products/addProducts");
const displayProducts = require("./routes/admin/products/displayProducts");
const featuredProducts = require("./routes/admin/products/featuredProducts");
const productinfo = require("./routes/admin/products/productinfo");
const products = require("./routes/products/products");
const editProduct = require("./routes/admin/products/editProduct");
const userList = require("./routes/admin/users/userList");
const userInfo = require("./routes/admin/users/userInfo");
const productsByCategory = require("./routes/products/productsByCategory");
const signup = require("./routes/userAuth/signup");
const getToken = require("./routes/userAuth/getToken");
const search = require("./routes/products/searchProducts");
const address = require("./routes/order/address");
const cart = require("./routes/cart/cart");
const addToCart = require("./routes/cart/addToCart");
const removeFromCart = require("./routes/cart/removeFromCart");
const updateQuantity = require("./routes/cart/updateQuantity");
const payment = require("./routes/payment");
const orders = require("./routes/orders");
// const checkout = require("./routes/checkout");
const OrderConfirm = require("./routes/order/confirm");
const adminOrders = require("./routes/admin/orders/orders")
const CategoriesList = require("./routes/products/categories");

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
passport.use(strategy);
app.use(passport.initialize());
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use("/images", express.static(path.join("backend/images")));
app.use("/data", express.static("data"));
app.use("/data", express.static(path.join("backend/data")));

//routes

app.use("/api/reset_password", resetPassword);
app.use("/api/forgot_password", forgotPassword);
app.use("/api/featured_products", featuredProducts);
app.use("/api/admin/featured_products", featuredProducts);
app.use("/api/admin/products", products);
app.use("/api/user/address/get", address);
app.use("/api/user/address/", address);
app.use("/api/user/new/address/", address);
app.use("/api/user/checkout/payment/", payment);
app.use("/api/user/order/", orders);
app.use("/api/user/cart/", orders);

app.use("/api/signup", signup);
app.use("/api/getToken", getToken);
app.use("/api/products", products);
app.use("/api/admin/products/add", addProducts);
app.use("/api/categories", categories);
app.use("/api/admin/productsList", displayProducts);
app.use("/api/products/category", productsByCategory);
app.use("/api/search", search);
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
app.use("/api/admin/orders", adminOrders);
app.use("/api/categories_list", CategoriesList);

app.get(
  "/api/getUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

app.get("/", (req, res) => {
  res.json({ name: "Magesh", company: "Sedin pvt" });
});

app.listen(port, () =>
  console.log(`JS Bootcamp project listening on port ${port}!`)
);
