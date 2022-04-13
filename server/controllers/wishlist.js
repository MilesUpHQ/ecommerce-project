const {
  insertProduct,
  getProductsByUser,
  removeProduct,
} = require("../queries/wishlist");

function getWishList(req, res) {
  user_id = req.user.id;
  getProductsByUser(user_id)
    .then((row) => {
      res.json(row);
    })
    .catch((err) => {
      res.status(500).json("Unable to fetch products");
    });
}

function addToWishList(req, res) {
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

function removeFromWishList(req, res) {
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

module.exports = {
  getWishList,
  addToWishList,
  removeFromWishList,
};
