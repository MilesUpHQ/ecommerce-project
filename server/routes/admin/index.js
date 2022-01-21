var express = require("express");
var router = express.Router();
const db = require("../../config/dbConfig");

function addCategory(db, newCategory) {
  return db
    .insert(newCategory, "name")
    .into("product_categories")
    .then((rows) => {
      return rows[0];
    });
}

function updateCategory(db, updateCategory) {
  return db
    .update("name", updateCategory.name)
    .update("parent_id", updateCategory.parent_id)
    .where("id", updateCategory.id)
    .into("product_categories")
    .then((rows) => {
      return rows[0];
    });
}

function deleteCategory(db, deleteCategory) {
  return db("product_categories")
    .delete()
    .where("id", deleteCategory.id)
    .then((rows) => {
      return rows[0];
    });
}

router.post("/category", async (req, res) => {
  try {
    if (req.body.parentCategoryId == 0) {
      let newCategory = await addCategory(db, {
        parent_id: null,
        name: req.body.categoryName,
      });
      res.json(newCategory);
    } else {
      let newCategory = await addCategory(db, {
        parent_id: req.body.parentCategoryId,
        name: req.body.categoryName,
      });
      res.send(newCategory);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await db("product_categories as e")
      .rightJoin("product_categories as m", "e.id", "m.parent_id")
      .select(
        "m.id",
        "m.name as category",
        "e.name as parent_category",
        "m.parent_id"
      )
      .orderBy("e.created_at");
    res.json(categories);
  } catch (err) {
    console.error(err);
  }
});

router.get("/search-categories", async (req, res) => {
  try {
    const parent_categories = await db('product_categories')
    .select('id', 'name')
    .where('name', "ILIKE", `%${req.query.search.toLocaleLowerCase()}%`)
    .limit(5)
    res.json(parent_categories)
  } catch (err) {
    console.log(err);
  }
});

router.post("/update-category", async (req, res) => {
  try {
    let newCategory = await updateCategory(db, {
      name: req.body.categoryName,
      id: req.body.categoryId,
      parent_id: req.body.parentCategoryId,
    });
    res.json(newCategory);
  } catch (err) {
    console.log(err);
  }
});

router.post("/delete-category", async (req, res) => {
  try {
    await deleteCategory(db, { id: req.body.id });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = router;
