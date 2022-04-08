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

 module.exports = {insertVariant};
