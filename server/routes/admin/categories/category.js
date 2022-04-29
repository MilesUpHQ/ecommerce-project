var express = require("express");
var router = express.Router();
const {
  getParentCategories,
  postCategory,
  editCategory,
  delCategory,
  getCategories,
} = require("../../../controllers/category");

router.get("/", getCategories);
router.get("/parent", getParentCategories);
router.post("/add", postCategory);
router.put("/update", editCategory);
router.delete("/delete", delCategory);

module.exports = router;
