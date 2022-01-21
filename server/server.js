const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
var adminRouter = require('./routes/admin/category');
const db = require("./config/dbConfig");
const port = 4000;
const resetPassword = require("./routes/resetPassword");
const forgotPassword = require("./routes/forgotPassword");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use("/api/reset_password", resetPassword);
app.use("/api/forgot_password", forgotPassword);

app.get("/", (req, res) => {
  res.json({ name: "Magesh", company: "Sedin pvt" });
});

app.listen(port, () =>
  console.log(`JS Bootcamp project listening on port ${port}!`)
);

app.use('/', adminRouter)
