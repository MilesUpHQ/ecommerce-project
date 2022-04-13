const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  getWishList,
  addToWishList,
  removeFromWishList,
} = require("../../controllers/wishlist");

router.get("/", passport.authenticate("jwt", { session: false }), getWishList);

router.get(
  "/add/:id",
  passport.authenticate("jwt", { session: false }),
  addToWishList
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  removeFromWishList
);

module.exports = router;
