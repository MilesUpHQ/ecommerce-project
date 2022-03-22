import React, { useEffect } from "react";
import "../Cart/cart-style.css";
import axios from "../../utils/ajax-helper";
import { getJWT } from "../../utils/jwt";
import SimpleNavBar from "../SimpleNavBar/SimpleNavBar";
import { Link } from "react-router-dom";
import ProductTable from "../Cart/ProductTable";
export default function Cart() {
  // get items for the server and store in state and update in cart component
  const [wishListItems, setWishListItems] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState(null);

  const getWishlistItems = () => {
    axios
      .get("/wishlist", {
        headers: {
          Authorization: `Bearer ${getJWT()}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setWishListItems(res.data);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again " + err);
      });
  };

  useEffect(() => {
    getWishlistItems();
  }, []);
  // delete item from cart
  const deleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .delete(`/wishlist/${id}`, {
          headers: {
            Authorization: `Bearer ${getJWT()}`,
          },
        })
        .then((res) => {
          console.log(res);
          getWishlistItems();
        })
        .catch((err) => {
          setErrorMsg("Sorry! Something went wrong. Please Try again " + err);
        });
    }
  };

  return (
    <>
      <SimpleNavBar />
      <div className="px-4 px-lg-0">
        <div className="pb-5">
          <div className="container">
            {wishListItems ? (
              wishListItems.length > 0 ? (
                <ProductTable
                  cartItems={wishListItems}
                  deleteItem={deleteItem}
                  isCart={false}
                />
              ) : (
                <div class="text-center mt-5">
                  <h3>
                    {errorMsg ? (
                      errorMsg
                    ) : (
                      <>
                        No Products In WishList :( <br />
                        <br />
                        Please Add Some Products
                      </>
                    )}
                    <br />
                    <br />
                    <Link to="/">
                      <button class="btn btn-outline-dark">Go To Home</button>
                    </Link>
                  </h3>
                </div>
              )
            ) : (
              // show loading
              <div class=" text-center mt-5">
                <h3>
                  Loading... <br />
                  <br />
                  Please Wait
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
