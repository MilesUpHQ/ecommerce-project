const express = require("express");
const router = express.Router();
const knex = require("../../utils/dbConfig");
const passport = require("passport");
const {
  insertProduct,
  getProductsByUser,
  removeProduct,
} = require("../../queries/wishlist");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    user_id = req.user.id;
    getProductsByUser(user_id)
      .then((row) => {
        res.json(row);
      })
      .catch((err) => {
        res.status(500).json("Unable to fetch products");
      });
  }
);

router.get(
  "/add/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    user_id = req.user.id;
    variant_id = req.params.id;
    insertProduct(user_id, variant_id)
      .then((row) => {
        res.json(row);
      })
      .catch((err) => {
        res.status(500).json("Unable to add product to wishlist");
      });
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    user_id = req.user.id;
    wishlist_id = req.params.id;
    removeProduct(user_id, wishlist_id)
      .then((row) => {
        res.json(row);
      })
      .catch((err) => {
        res.status(500).json("Unable to remove product from wishlist");
      });
  }
);

module.exports = router;
