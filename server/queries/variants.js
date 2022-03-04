 const db = require("../utils/dbConfig");

function insertVariants(params,id) {
  return db("variants").insert({
          size: params.size,
          color: params.color,
          type: params.type,
          price: params.price,
          product_id: id,
  })
}

function updateVariants(params) {
  return db("variants").where("product_id", params.id)
    .update({
      size: params.size,
      color: params.color,
      type: params.type,
      price: params.price,
    })
}

 module.exports = { updateVariants , insertVariants};
