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
  let imgArray = [];
  knex("variant_images")
    .select("variant_images.image_url")
    .then((res) => {
      for (let i = 0; i < res.length; i++) {
        let url = res[i].image_url.toString();
        imgArray.push(url);
      }
      imgArray = removeDuplicate(imgArray);
    })
    .catch((err) => {
      res.send("error in getting images");
      imgArray = null;
    });

  knex("featured_products")
    .leftJoin("products", "featured_products.product_id", "products.id")
    .leftJoin("variants", "variants.product_id", "products.id")
    .select(
      "featured_products.id",
      "products.name",
      "products.id as product_id",
      "products.description",
      "variants.price"
    )
    .whereNotNull("variants.price")
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
    .catch((err) => {
      res.send("error in getting products");
    });
});

// *********************************************** view Product ****************************************

router.get("/:id", async (req, res, next) => {
  let categories;
  knex("products")
    .leftJoin(
      "product_categories",
      "products.category_id",
      "product_categories.id"
    )
    .select("product_categories.name")
    .where({ "products.id": req.params.id })
    .then((res) => {
      categories = res;
    })
    .catch((err) => {
      res.send("error in getting category");
      categories = null;
    });

  let colors;
  knex("variants")
    .leftJoin("products", "products.id", "variants.product_id")
    .select("variants.color")
    .where({ "products.id": req.params.id })
    .whereNotNull("variants.color")
    .then((res) => {
      colors = res;
    })
    .catch((err) => {
      res.send("error in getting colors");
      colors = null;
    });

  let sizes;
  knex("variants")
    .leftJoin("products", "products.id", "variants.product_id")
    .select("variants.size")
    .where({ "products.id": req.params.id })
    .whereNotNull("variants.size")
    .then((res) => {
      sizes = res;
    })
    .catch((err) => {
      res.send("error in getting sizes");
      sizes = null;
    });

  let reviews;
  knex("reviews")
    .leftJoin("products", "products.id", "reviews.product_id")
    .leftJoin("users", "users.id", "reviews.user_id")
    .select("reviews.rating", "reviews.comment", "users.username")
    .where({ "products.id": req.params.id })
    .then((res) => {
      reviews = res;
    })
    .catch((err) => {
      res.send("error in getting reviews");
      reviews = null;
    });

  let imgArray = [];
  knex("variant_images")
    .leftJoin("variants", "variant_images.variant_id", "variants.id")
    .leftJoin("products", "products.id", "variants.product_id")
    .select("variant_images.image_url")
    .where({ "products.id": req.params.id })
    .then((res) => {
      for (let i = 0; i < res.length; i++) {
        let url = res[i].image_url.toString();
        imgArray.push(url);
      }
      imgArray = removeDuplicate(imgArray);
    })
    .catch((err) => {
      res.send("error in getting variant images");
      imgArray = null;
    });
  knex("featured_products")
    .leftJoin("products", "featured_products.product_id", "products.id")
    .leftJoin("variants", "variants.product_id", "products.id")
    .select(
      "products.name",
      "products.id as product_id",
      "products.description",
      "variants.price"
    )
    .where({ "products.id": req.params.id })
    .then((response) => {
      let product = response;
      res.json({ product, categories, colors, sizes, imgArray, reviews });
    })
    .catch((err) => {
      res.send("error in getting product");
    });
});

//**************************************deleting product***************************** */

router.delete("/delete-featured-product/:id", (req, res) => {
  knex("featured_products")
    .where("id", req.params.id)
    .del(["id"])
    .then((row) => {
      res.json(row[0]);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
