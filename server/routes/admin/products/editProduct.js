const express = require("express");
const {
  editProduct,
  editProductInfo,
} = require("../../../controllers/products");
const router = express.Router();

router.put("/", editProduct);
router.get("/:id", editProductInfo);

module.exports = router;
