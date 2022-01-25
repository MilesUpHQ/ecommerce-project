var express = require("express");
var router = express.Router();
const db = require("../../config/dbConfig");
const { attachPaginate } = require("knex-paginate");
const knex = require("../../utils/knex");

attachPaginate();

function addCategory(db, newCategory) {
  return db
    .insert(newCategory, "*")
    .into("product_categories")
    .then((rows) => {
      return rows[0];
    });
}

function updateCategory(db, updateCategory) {
  return db
    .update("name", updateCategory.name, "*")
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

router.get("/categories", async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;

    const categories = await db("product_categories as e")
      .rightJoin("product_categories as m", "e.id", "m.parent_id")
      .select(
        "m.id",
        "m.name as category",
        "e.name as parent_category",
        "m.parent_id",
        "m.updated_at"
      )
      .orderBy("m.updated_at", "desc")
      .paginate({
        perPage: 4,
        currentPage: page,
        isLengthAware: true,
      })
      .then(async (response) => {
        let categories = response.data;
        let currPage = response.pagination.currentPage;
        let lastPage = response.pagination.lastPage;
        let totalPages = [];
        for (let i = 1; i <= lastPage; i++) {
          if (lastPage - 1 >= 0) {
            totalPages.push(i);
          }
        }

        res.json({ categories, currPage, lastPage, totalPages });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    res.status(401).json({ error: err });
  }
});

router.get("/search-categories", async (req, res) => {
  try {
    const parent_categories = await db("product_categories")
      .select("id", "name")
      .where("name", "ILIKE", `%${req.query.search.toLocaleLowerCase()}%`)
      .limit(5);
    res.json(parent_categories);
  } catch (err) {
    res.status(401).json({ error: err });
  }
});

router.post("/category", async (req, res) => {
  try {
    let newCategory = await addCategory(db, {
      parent_id: req.body.parentCategoryId || null,
      name: req.body.categoryName,
    });
    if (newCategory.parent_id) {
      let parent = await db("product_categories")
        .select("name")
        .where("id", newCategory.parent_id);
      newCategory.parent_category = parent[0].name;
    }
    res.send(newCategory);
  } catch (err) {
    res.status(401).json({ error: err });
  }
});

router.put("/update-category", async (req, res) => {
  try {
    let newCategory = await updateCategory(db, {
      name: req.body.categoryName,
      id: req.body.categoryId,
      parent_id: req.body.parentCategoryId,
    });
    if (newCategory.parent_id) {
      let parentCategory = await db("product_categories")
        .select("name")
        .where("id", newCategory.parent_id);
      newCategory.parent_category = parentCategory[0].name;
    }
    res.json(newCategory);
  } catch (err) {
    res.status(401).json({ error: err });
  }
});

router.delete("/delete-category", async (req, res) => {
  try {
    await deleteCategory(db, { id: req.query.id });
    res.json({ message: "deleted succesfully" });
  } catch (err) {
    res.status(401).json({ error: err });
  }
});

module.exports = router;
