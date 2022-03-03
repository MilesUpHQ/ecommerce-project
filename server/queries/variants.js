 const db = require("../utils/dbConfig");

// function insertVariants(params) {
//   return db("variants").insert({
//     name: params.name,
//     description: params.description,
//     category_id: params.category,
//   });
// }
function updateVariants(params) {
  return db("variants").where("product_id", params.id)
    .update({
      size: params.size,
      color: params.color,
      type: params.type,
      price: params.price,
    })
}

 module.exports = { updateVariants };
