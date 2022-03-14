const db = require("../utils/dbConfig");

function addCategory(params) {
  return db
    .insert(params, "*")
    .into("product_categories")
    .then((rows) => {
      return rows[0];
    });
}

function updateCategory(params) {
  return db
    .update("name", params.name, "*")
    .update("parent_id", params.parent_id)
    .where("id", params.id)
    .into("product_categories")
    .then((rows) => {
      return rows[0];
    });
}

function deleteCategory(params) {
  return db("product_categories")
    .delete()
    .where("id", params.id)
    .then((rows) => {
      return rows[0];
    });
}

module.exports = { addCategory, updateCategory, deleteCategory };
