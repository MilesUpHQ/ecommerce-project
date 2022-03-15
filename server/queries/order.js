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

function updateQuantity(order_id, variant_id, prev_quantity, quantity) {
  return db("order_items")
    .where({ order_id: order_id })
    .andWhere({ variant_id: variant_id })
    .update({ quantity: prev_quantity + quantity });
}

function getOrderItemsBy(order_id, variant_id) {
  return db("order_items")
    .where({ order_id: order_id })
    .andWhere({ variant_id: variant_id });
}

module.exports = {
  insertOrderCart,
  updateOrderStatus,
  getOrderCartBy,
  insertOrderItems,
  updateQuantity,
  getOrderItemsBy,
};
