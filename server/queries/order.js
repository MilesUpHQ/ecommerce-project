const db = require("../utils/dbConfig");

function insertOrderCart(user_id, status) {
  return db("orders").insert({
    user_id: user_id,
    status: status,
  });
}

function updateOrderStatus(id) {
  return db("orders").where("id", id).update({
    status: params.status,
  });
}

function getOrderCartBy(field, value) {
  return db("orders")
    .where({ [field]: value })
    .andWhere({ status: "cart" });
}

function insertOrderItems(order_id, variant_id, quantity) {
  return db("order_items").insert({
    order_id: order_id,
    variant_id: variant_id,
    quantity: quantity,
  });
}

module.exports = {
  insertOrderCart,
  updateOrderStatus,
  getOrderCartBy,
  insertOrderItems,
};
