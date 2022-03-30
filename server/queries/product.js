const db = require("../utils/dbConfig");

function insertProduct(params) {
  return db("products").insert({
    name: params.name,
    description: params.description,
    category_id: params.category,
  });
}

module.exports = { insertProduct};
