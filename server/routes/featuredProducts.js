const express = require("express");
const router = express.Router();
const knex = require("../utils/knex");
console.log("featured products");
const { attachPaginate } = require("knex-paginate");

attachPaginate();

router.get("", (req, res, next) => {
  console.log("getting featured products");
  let page = parseInt(req.query.page) || 1;
  console.log("page", page);

  knex("fetured_products")
    .leftJoin("products", "fetured_products.product_id", "products.id")
    .leftJoin(
      "product_categories",
      "products.category_id",
      "product_categories.id"
    )
    .leftJoin(
      "product_images",
      "fetured_products.product_id",
      "product_images.product_id"
    )
    .select(
      "product_categories.name as category",
      "products.name",
      "products.id as product_id",
      "products.description",
      "products.price",
      "product_images.image_url",
      "product_images.id"
    )
    .orderBy("products.updated_at", "desc")
    .paginate({
      perPage: 4,
      currentPage: page,
      isLengthAware: true,
    })
    .then((response) => {
      // console.log("response ::::", response);
      // let finalResponse = [];

      // response.map((product) => {
      //   // console.log("product: ", product);
      // for (let i = 0; i < response.length; i++) {
      //   let finalProduct = response[i];
      //   // console.log("finalProduct: ", finalProduct);
      //   finalProduct.image_url = [response[i].image_url];
      //   // console.log("finalProduct after array: ", finalProduct);
      //   for (let j = 0; j < response.length; j++) {
      //     let jProduct = response[j];
      //     // console.log("jProduct: ", jProduct);
      //     // jProduct.image_url = [response[j].image_url];
      //     // console.log("jProduct after array: ", finalProduct);
      //     if (response[i].product_id == response[j].product_id) {
      //       // console.log(
      //       // //   "cvjhdvfhvdjhbc xjhbfbgdjhfcgasddaaaggggggggggggggggggggggggggggg"
      //       // // );
      //       finalProduct.image_url.push(response[j].image_url);
      //       console.log("response[i].image_url: ", response[j].image_url);
      //       // console.log("jProduct : ", jProduct);

      //       //  );
      //       finalResponse.push(finalProduct);
      //     }
      //   }
      // }
      //   response.map((product_1) => {
      //     console.log("product_1: ", product_1);
      //     if (product.product_id == product_1.product_id) {
      //       finalProduct.image_url.push(product_1.image_url);
      //       console.log("product_1.image_url: ", product_1.image_url);
      //       // finalResponse.push(finalProduct);
      //     }
      //   });
      //   // console.log("finalProduct:", finalProduct);
      // });
      // console.log("finalResponse:", finalResponse);
      // console.log(
      //   "finalResponse length ::::::::::::::::::::::",
      //   finalResponse.length
      // );
      let featuredProducts = response.data;
      console.log("featuredProducts:", featuredProducts);
      let currPage = response.pagination.currentPage;
      console.log("currPage:", currPage);
      let lastPage = response.pagination.lastPage;
      console.log("lastPage:", lastPage);
      let totalPages = [];
      for (let i = 1; i <= lastPage; i++) {
        if (lastPage - 1 >= 0) {
          totalPages.push(i);
        }
      }
      res.json({ featuredProducts, currPage, lastPage, totalPages });
    })
    .catch((err) => console.log(err));
});
module.exports = router;
