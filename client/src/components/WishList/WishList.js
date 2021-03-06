import React, { useEffect } from "react";
import "../Cart/cart-style.css";
import axios from "../../utils/ajax-helper";
import { getJWT } from "../../utils/jwt";
import SimpleNavBar from "../SimpleNavBar/SimpleNavBar";
import { Link } from "react-router-dom";
import ProductTable from "../Cart/ProductTable";
import { Spinner } from "react-bootstrap";
export default function Cart() {
  // get items for the server and store in state and update in cart component
  const [wishListItems, setWishListItems] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const getWishlistItems = () => {
    setIsLoading(true);
    axios
      .get("/wishlist", {
        headers: {
          Authorization: `Bearer ${getJWT()}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setWishListItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again " + err);
        setIsLoading(false);
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
      <SimpleNavBar isCart={false} />
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
                  {isLoading && <Spinner animation="grow" />}
                  {!isLoading && (
                    <h3>
                      {errorMsg ? (
                        errorMsg
                      ) : (
                        <>
                          No Products In Cart :( <br />
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
                  )}
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
