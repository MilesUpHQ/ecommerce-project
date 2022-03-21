const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");
const addPayment = (status, payment_gateway_paymentId, order_id) => {
  return knex("payment").insert({
    payment_id: payment_gateway_paymentId,
    status: status,
    type: "card",
    order_id: order_id,
  });
};
const addOrder = (status, payment_gateway_id, address_id) => {
  return knex("orders").update({
    status: status,
    payment_gateway_id: payment_gateway_id,
    address_id: address_id,
  });
};
router.put("/confirm/:id", (req, res, next) => {
  knex("orders")
    .where("orders.id", req.params.id)
    .then(async (result) => {
      if (result.length == 0) {
        res.send("order does not exists");
      } else {
        let paymentStatus = "completed";
        addPayment(paymentStatus, req.body.payment_id, req.params.id)
          .then((result) => {
            let orderStatus = "placed";
            addOrder(
              orderStatus,
              req.body.payment_gateway_id,
              req.body.address_id
            )
              .then((row) => {
                res.json({ message: "order successfull" });
              })
              .catch((err) => {
                paymentStatus = "completed";
                orderStatus = "paid";
                res.json({ message: "could not update" });
              });
          })
          .catch((err) => {
            paymentStatus = "canceled";
            console.log("err in adiing payment", err);
          });
      }
    });
});

module.exports = router;
