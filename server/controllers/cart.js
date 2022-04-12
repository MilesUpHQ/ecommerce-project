const knex = require("../utils/dbConfig");
const {
  insertOrderCart,
  getOrderCartBy,
  insertOrderItems,
  updateQuantity,
  getOrderItemsBy,
} = require("../queries/order");

function getCart(req, res) {
  user_id = req.user.id;
  knex("orders")
    .join("order_items", "orders.id", "=", "order_items.order_id")
    .join("variants", "order_items.variant_id", "=", "variants.id")
    .join("products", "variants.product_id", "=", "products.id")
    .join("variant_images", "variants.id", "=", "variant_images.variant_id")
    .where({ "orders.user_id": user_id })
    .andWhere({ "orders.status": "cart" })
    .select(
      "products.name",
      "products.id",
      "order_items.id as cart_id",
      "order_items.quantity",
      "variants.price",
      "variant_images.image_url",
      "orders.total_price as total"
    )
    .then((row) => {
      res.json(row);
    })
    .catch((err) => {
      res
        .status(500)
        .json("Unable to fetch cart items. Please try again later.");
    });
}

function addToCart(req, res) {
  user_id = req.user.id;
  let quantity = req.body.quantity;
  if (req.body.quantity === undefined || req.body.quantity === null) {
    quantity = 1;
  } else {
    quantity = parseInt(req.body.quantity);
  }

  getOrderCartBy("user_id", user_id).then((row) => {
    if (row.length === 0) {
      console.log("row", row);
      insertOrderCart(user_id, "cart")
        .then((row) => {
          insertOrderItems(row[0]?.id, req.params.variant_id, quantity)
            .then((row) => {
              res.json(row);
            })
            .catch((err) => {
              console.log("err", err);
              res.status(500).json(err);
            });
        })
        .catch((err) => {
          console.log("err", err);
          res.status(500).json(err);
        });
    } else {
      console.log("row1", row);
      const order_id = row[0].id;
      getOrderItemsBy(row[0].id, req.params.variant_id).then((row) => {
        if (row.length === 0) {
          insertOrderItems(order_id, req.params.variant_id, quantity).then(
            (row) => {
              res.json(row);
            }
          );
        } else {
          updateQuantity(
            order_id,
            req.params.variant_id,
            row[0].quantity,
            quantity
          ).then((row) => {
            res.json(row);
          });
        }
      });
    }
  });
}

function updateCartQuantity(req, res) {
  knex("order_items")
    .where({ id: req.params.id })
    .update({ quantity: req.body.quantity })
    .then((row) => {
      res.json(row);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).send("Unable to update item in cart ");
    });
}

function deleteCart(req, res) {
  knex("order_items")
    .where({ id: req.params.id })
    .del()
    .then((row) => {
      res.json(row);
    })
    .catch((err) => {
      res.status(400).send("Unable to delete item from cart ");
    });
}

module.exports = { getCart, addToCart, updateCartQuantity, deleteCart };
