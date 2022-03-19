import React, { useEffect } from "react";
import "./cart-style.css";
import axios from "../../utils/ajax-helper";
import { getJWT } from "../../utils/jwt";
import SimpleNavBar from "../SimpleNavBar/SimpleNavBar";
import { Link } from "react-router-dom";
import ProductTable from "./ProductTable";
export default function Cart() {
  // get items for the server and store in state and update in cart component
  const [cartItems, setCartItems] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [total, setTotal] = React.useState(0);

  const getCartItems = () => {
    axios
      .get("/cart", {
        headers: {
          Authorization: `Bearer ${getJWT()}`,
        },
      })
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again " + err);
      });
  };

  useEffect(() => {
    getCartItems();
  }, []);
  // delete item from cart
  const deleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .delete(`/cart/remove/${id}`, {
          headers: {
            Authorization: `Bearer ${getJWT()}`,
          },
        })
        .then((res) => {
          getCartItems();
        })
        .catch((err) => {
          setErrorMsg("Sorry! Something went wrong. Please Try again " + err);
        });
    }
  };
  // update item in cart

  const updateItem = (id, quantity) => {
    if (quantity <= 0) {
      deleteItem(id);
    }
    setCartItems(
      cartItems.map((item) =>
        item.cart_id === id
          ? {
              ...item,
              quantity: quantity,
            }
          : item
      )
    );
    axios
      .put(`/cart/update/${id}`, {
        quantity: quantity,
      })
      .then((res) => {
        getCartItems();
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again " + err);
      });
  };
  return (
    <>
      <SimpleNavBar />
      <div className="px-4 px-lg-0">
        <div className="pb-5">
          <div className="container">
            {cartItems ? (
              cartItems.length > 0 ? (
                <ProductTable
                  cartItems={cartItems}
                  deleteItem={deleteItem}
                  updateItem={updateItem}
                  isCart={true}
                />
              ) : (
                <div className="text-center mt-5">
                  <h3>
                    No Products In Cart :( <br />
                    <br />
                    Please Add Some Products
                    <br />
                    <br />
                    <Link to="/">
                      <button className="btn btn-outline-dark">Go To Home</button>
                    </Link>
                  </h3>
                </div>
              )
            ) : (
              // show loading
              <div className=" text-center mt-5">
                <h3>
                  Loading... <br />
                  <br />
                  Please Wait
                </h3>
              </div>
            )}

            <div className="row py-5 p-4 bg-white rounded shadow-sm">
              <div className="col-lg-6">
                <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
                  Coupon code
                </div>
                <div className="p-4">
                  <p className="font-italic mb-4">
                    If you have a coupon code, please enter it in the box below
                  </p>
                  <div className="input-group mb-4 border rounded-pill p-2">
                    <input
                      type="text"
                      placeholder="Apply coupon"
                      aria-describedby="button-addon3"
                      className="form-control border-0"
                    />
                    <div className="input-group-append border-0">
                      <button
                        id="button-addon3"
                        type="button"
                        className="btn btn-dark px-4 rounded-pill"
                      >
                        <i className="fa fa-gift mr-2"></i>Apply coupon
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
                  Order summary{" "}
                </div>
                <div className="p-4">
                  <p className="font-italic mb-4">
                    Shipping and additional costs are calculated based on values
                    you have entered.
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li className="d-flex justify-content-between py-3 border-bottom">
                      <strong className="text-muted">Order Subtotal </strong>
                      <strong>₹{cartItems[0]?.total || "0.00"}</strong>
                    </li>

                    <li className="d-flex justify-content-between py-3 border-bottom">
                      <strong className="text-muted">Tax</strong>
                      <strong>₹0.00</strong>
                    </li>
                    <li className="d-flex justify-content-between py-3 border-bottom">
                      <strong className="text-muted">Total</strong>
                      <h5 className="font-weight-bold">
                        ₹{cartItems[0]?.total || "0.00"}
                      </h5>
                    </li>
                  </ul>
                  <a
                    href="/user/address"
                    className="btn btn-dark rounded-pill py-2 btn-block"
                  >
                    Procceed
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
