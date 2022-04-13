var express = require("express");
var router = express.Router();
const { attachPaginate } = require("knex-paginate");
const {
  getParentCategories,
  postCategory,
  editCategory,
  delCategory,
  getCategories,
} = require("../../../controllers/category");
attachPaginate();

router.get("/", getCategories);
router.get("/parent", getParentCategories);
router.post("/add", postCategory);
router.put("/update", editCategory);
router.delete("/delete", delCategory);

module.exports = router;
