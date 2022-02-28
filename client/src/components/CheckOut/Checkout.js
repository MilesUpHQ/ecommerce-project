import React from "react";
import { useEffect, useState } from "react";
import { getJWT } from "../../utils/jwt";
import { parseJwt } from "../../utils/jwt";
import axios from "../../utils/ajax-helper";

function loadRazorPay(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Checkout = () => {
  let [response, setResponse] = useState(null);
  let [name, setName] = useState(null);
  let [email, setEmail] = useState(null);
  let [phone, setPhone] = useState(null);

  useEffect(() => {
    axios
      .post("/user/checkout/razorpay/")
      .then((res) => {
        setResponse(res.data);
        console.log("res : ", response.id);
      })
      .catch((err) => {
        console.log("err :", err);
      });
  }, []);

  const displayRazorPay = async () => {
    const res = await loadRazorPay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("something went wrong ! cant load razor pay,Check internet");
      return;
    }
    var options = {
      key: process.env.RAZOR_PAY_KEY,
      amount: response.amount.toString(),
      currency: response.currency,
      name: "E-commerence",
      description: "Transaction for placing an order",
      order_id: response.id,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: name,
        email: email,
        contact: phone,
      },
    };
    var paymentObj = new window.Razorpay(options);
    paymentObj.open();
    paymentObj.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    displayRazorPay();
  };

  return (
    <React.Fragment>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="container">
            <form className="forms-sample" onSubmit={submitHandler}>
              <br />
              <div className="form-group">
                <label htmlFor="exampleInputName1">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName1"
                  placeholder="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputName1">E-mail </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputName1"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputName1">phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName1"
                  placeholder="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <br />
              {response && (
                <button type="submit" className="btn btn-primary mr-2">
                  Pay {response.amount / 100}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Checkout;
