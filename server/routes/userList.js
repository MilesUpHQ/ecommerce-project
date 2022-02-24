const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");

function deleteUser(db, product) {
    db("users")
      .select("users.id")
      .where("id", parseInt(product.id))
      .then((rows) => {
            return rows[0];
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
router.get("/", async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    await knex("users")
      .select(
        "users.id",
        "users.username",
        "users.email",
        "users.first_name",
        "users.last_name",
        "users.avatar_url",
        "users.is_admin"
      )
      .orderBy("users.first_name", "asc")
      .paginate({
        perPage: 15,
        currentPage: page,
        isLengthAware: true,
      })
      .then(async (response) => {
        let currPage = response.pagination.currentPage;
        let lastPage = response.pagination.lastPage;
        let totalPages = [];
        for (let i = 1; i <= lastPage; i++) {
          if (lastPage - 1 >= 0) {
            totalPages.push(i);
          }
        }
        let products = response.data;
        res.json({ products, currPage, lastPage, totalPages });
      })
      .catch((err) => {
        res.status(400).send("Unable to display products");
      });
  });

  router.delete("/", async (req, res) => {
    try {
      console.log("d", req.query);
      await deleteUser(knex, { id: req.query.id });
      res.json({ message: "user deleted succesfully" });
    } catch (err) {
      console.log(err);
      res.status(401).json({ error: err });
    }
  });

module.exports = router;