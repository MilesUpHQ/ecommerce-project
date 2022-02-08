//  create a react cart component
//  create a react cart item component

import React, { useEffect } from "react";
import "./cart-style.css";
import axios from "../../utils/ajax-helper";

export default function Cart() {
  // get items for the server and store in state and update in cart component
  // /cart
  const [cartItems, setCartItems] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState(null);

  useEffect(() => {
    axios
      .get("/cart")
      .then((res) => {
        console.log(res.data.cartItems);
        setCartItems(res.data.cartItems);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again");
      });
  }, []);
  return (
    <>
      <div className="cart-container">
        <div className="cart-header">
          <h4>Cart</h4>
        </div>
        <div className="cart-body">
          {cartItems.map((item) => (
            <div className="cart-item">
              <div className="cart-item-img">
                <img src={item.image} alt="item" />
              </div>
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">${item.price}</div>
                <div className="cart-item-quantity">
                  <button className="cart-item-quantity-btn">-</button>
                  <span className="cart-item-quantity-value">
                    {item.quantity}
                  </span>
                  <button className="cart-item-quantity-btn">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total</span>
            <span>${cartItems.reduce((acc, item) => acc + item.price, 0)}</span>
          </div>
          <div className="cart-checkout">
            <button className="cart-checkout-btn">Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
}
