const db = require("../utils/dbConfig");

function insertProduct(user_id, variant_id) {
  // check if item is already in wishlist and return if so to avoid duplicates
  return db("wishlist")
    .where({ user_id: user_id, variant_id: variant_id })
    .then((row) => {
      if (row.length === 0) {
        return db("wishlist")
          .insert({ user_id: user_id, variant_id: variant_id })
          .then((row) => {
            return row;
          });
      } else {
        return { message: "Item already in wishlist" };
      }
    });
}

function getProductsByUser(user_id) {
  return db("wishlist")
    .join("variants", "variants.id", "=", "wishlist.variant_id")
    .join("products", "products.id", "=", "variants.product_id")
    .join("variant_images", "variant_images.variant_id", "=", "variants.id")
    .where("wishlist.user_id", user_id)
    .select(
      "products.id",
      "products.name",
      "products.description",
      "variants.color",
      "variants.size",
      "variants.type",
      "variants.price",
      "variants.id as variant_id",
      "variant_images.image_url",
      "wishlist.id as wishlist_id"
    );
}

function removeProduct(user_id, wishlist_id) {
  return db("wishlist").where({ user_id: user_id, id: wishlist_id }).del();
}

module.exports = { insertProduct, getProductsByUser, removeProduct };
