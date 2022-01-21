const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
var adminRouter = require('./routes/admin/category');
const db = require("./config/dbConfig");
const port = 4000;
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ name: "Magesh", company: "Sedin pvt" });
});

app.listen(port, () =>
  console.log(`JS Bootcamp project listening on port ${port}!`)
);

app.use('/', adminRouter)