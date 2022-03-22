var express = require("express");
var router = express.Router();
const db = require("../../utils/dbConfig");

router.get("/", async (req, res) => {
  try {
    let parent_categories = await db("product_categories")
      .select("id", "name")
      .whereNull("parent_id")
      .orderBy("updated_at");

    for (let i = 0; i < parent_categories.length; i++) {
      let sub_categories = await db("product_categories")
        .select("id", "name")
        .where("parent_id", parent_categories[i].id)
        .orderBy("updated_at", "desc");
      parent_categories[i].sub_categories = sub_categories;
    }

    res.json(parent_categories);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
