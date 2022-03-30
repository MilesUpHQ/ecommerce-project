 const db = require("../utils/dbConfig");

function insertVariant(body) {
  return db("variants").insert({
          size: body.size,
          color: body.color,
          type: body.type,
          price: body.price,
          product_id: body.id,
  })
}

function updateVariant(params) {
  return db("variants").where("product_id", params.id)
    .update({
      size: params.size,
      color: params.color,
      type: params.type,
      price: params.price,
    })
}

 module.exports = { updateVariant , insertVariant};
