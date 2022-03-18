import axios from "../../utils/ajax-helper";
import React, { useEffect } from "react";
import { getJWT } from "../../utils/jwt";
import toast, { Toaster } from "react-hot-toast";

export default function AddToWishList(id) {
  useEffect(() => {
    console.log("id", id);
    axios
      .get(`/wishlist/add/${id.id}`, {
        headers: {
          authorization: `Bearer ${getJWT()}`,
        },
      })
      .then((res) => {
        if (res.data.message) {
          toast(res.data.message, { icon: "👻" });
        } else {
          toast.success("Iteam added to wishlist");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Sorry! Something went wrong. Please Try again " + err);
      });
  }, [id]);
  return (
    <div>
      <Toaster />
    </div>
  );
}
