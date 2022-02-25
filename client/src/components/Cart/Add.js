import axios from "../../utils/ajax-helper";
import React, { useEffect } from "react";
import { getJWT } from "../../utils/jwt";
import toast, { Toaster } from "react-hot-toast";

export default function Add({ id, quantity }) {
  // add product to cart in server and redirect to cart component
  if (!quantity) {
    quantity = 1;
  }
  useEffect(() => {
    console.log("id", id);
    console.log("JWt", getJWT());
    axios
      .get(`/cart/add/${id}`, {
        headers: {
          authorization: `Bearer ${getJWT()}`,
        },
        body: {
          quantity: quantity,
        },
      })
      .then((res) => {
        toast.success("Iteam added to cart");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Sorry! Something went wrong. Please Try again " + err);
      });
  }, [id, quantity]);
  return (
    <div>
      <Toaster />
    </div>
  );
}
