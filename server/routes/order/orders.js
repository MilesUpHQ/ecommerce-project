const express = require("express");
const router = express.Router();
const knex = require("../../utils/dbConfig");
const addPayment = (status, payment_gateway_paymentId, order_id) => {
  return knex("payment").insert({
    payment_id: payment_gateway_paymentId,
    status: status,
    type: "card",
    order_id: order_id,
  });
};
const addOrder = (status, payment_gateway_id, address_id) => {
  console.log(
    "payment_gateway_id in function :",
    payment_gateway_id,
    " address id:",
    address_id
  );
  let date = new Date();
  console.log("date  :", date);
  return knex("orders").update({
    order_date: date,
    status: status,
    payment_gateway_id: payment_gateway_id,
    address_id: address_id,
  });
};
router.put("/confirm/:id", (req, res, next) => {
  console.log("payment_gateway_id :", req.body.payment_gateway_id);
  knex("orders")
    .where({ "orders.id": req.params.id, "orders.status": "cart" })
    .then(async (result) => {
      if (result.length == 0) {
        res.send("order does not exists");
      } else {
        let paymentStatus = "completed";
        addPayment(paymentStatus, req.body.payment_id, req.params.id)
          .then((result) => {
            console.log("result :", result);
            let orderStatus = "placed";
            addOrder(
              orderStatus,
              req.body.payment_gateway_id,
              req.body.address_id
            )
              .then((row) => {
                console.log("result of add oder:", row);
                res.json({ message: "order successfull" });
              })
              .catch((err) => {
                console.log("result err of add oder:", err);
                paymentStatus = "completed";
                orderStatus = "paid";
                res.json({ message: "could not update" });
              });
          })
          .catch((err) => {
            console.log("result err of add payment:", err);
            paymentStatus = "canceled";
          });
      }
    });
});

module.exports = router;
