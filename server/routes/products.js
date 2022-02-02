const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");

const removeDuplicate = (array) => {
  var dups = [];
  var arr = array.filter(function (el) {
    if (dups.indexOf(el) == -1) {
      dups.push(el);
      return true;
    }
    return false;
  });
  return arr;
};

router.get("", async (req, res, next) => {
  let page = parseInt(req.query.page) || 1;
  let images = await knex("variant_images").select("variant_images.image_url");
  let imgArray = [];
  for (let i = 0; i < images.length; i++) {
    let url = images[i].image_url.toString();
    imgArray.push(url);
  }
  imgArray = removeDuplicate(imgArray);

  knex("fetured_products")
    .leftJoin("products", "fetured_products.product_id", "products.id")
    .select(
      "products.name",
      "products.id as product_id",
      "products.description",
      "products.price"
    )
    .orderBy("products.updated_at", "desc")
    .paginate({
      perPage: 15,
      currentPage: page,
      isLengthAware: true,
    })
    .then((response) => {
      let featuredProducts = response.data;
      let currPage = response.pagination.currentPage;
      let lastPage = response.pagination.lastPage;
      let totalPages = [];
      for (let i = 1; i <= lastPage; i++) {
        if (lastPage - 1 >= 0) {
          totalPages.push(i);
        }
      }
      res.json({ featuredProducts, currPage, lastPage, totalPages, imgArray });
    })
    .catch((err) => {});
});

router.get("/:id", async (req, res, next) => {
  let categories = await knex("products")
    .leftJoin(
      "product_categories",
      "products.category_id",
      "product_categories.id"
    )
    .select("product_categories.name")
    .where({ "products.id": req.params.id });

  let colors = await knex("variants")
    .leftJoin("products", "products.id", "variants.product_id")
    .select("variants.color")
    .where({ "products.id": req.params.id });

  let sizes = await knex("variants")
    .leftJoin("products", "products.id", "variants.product_id")
    .select("variants.size")
    .where({ "products.id": req.params.id });

  let reviews = await knex("reviews")
    .leftJoin("products", "products.id", "reviews.product_id")
    .leftJoin("users", "users.id", "reviews.user_id")
    .select("reviews.rating", "reviews.comment", "users.username")
    .where({ "products.id": req.params.id });

  let images = await knex("variant_images")
    .leftJoin("variants", "variant_images.variant_id", "variants.id")
    .leftJoin("products", "products.id", "variants.product_id")
    .select("variant_images.image_url")
    .where({ "products.id": req.params.id });

  console.log("images :", images);
  let imgArray = [];
  for (let i = 0; i < images.length; i++) {
    let url = images[i].image_url.toString();
    console.log("url :", url);
    imgArray.push(url);
  }
  console.log("img array ::", imgArray);

  knex("fetured_products")
    .leftJoin("products", "fetured_products.product_id", "products.id")
    .select(
      "products.name",
      "products.id as products_id",
      "products.description",
      "products.price"
    )
    .where({ "products.id": req.params.id })
    .then((response) => {
      let product = response;
      res.json({ product, categories, colors, sizes, imgArray, reviews });
    })
    .catch((err) => {});
});

module.exports = router;
