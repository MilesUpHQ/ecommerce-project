import React from "react";
import "../ResetPassword/resetPassword.css";
import { useEffect, useState } from "react";
import axios from "../../utils/ajax-helper";
import GetFeaturedProducts from "./GetFeaturedProduct";

const DisplayFeaturedProduct = () => {
  let [featuredProducts, setfeaturedProducts] = useState([]);
  const [currPage, setCurrPage] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handlePagination = (page) => {
    axios
      .get(`/featuredProducts?page=${page}`)
      .then((res) => {
        setfeaturedProducts(res.data.featuredProducts);
        setCurrPage(res.data.currPage);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again", err);
      });
  };
  useEffect(async () => {
    axios
      .get("/featuredProducts")
      .then((res) => {
        console.log("ressssssssssssssssssssssssssssssssssssss :", res);
        setCurrPage(res.data.currPage);
        setLastPage(res.data.lastPage);
        setTotalPages(res.data.totalPages);
        setfeaturedProducts(res.data.featuredProducts);
      })
      .catch((err) => {
        console.log("ressssssssssssssssssssssssssssssssssssss :", err);
        setErrorMsg("Sorry! Something went wrong. Please Try again", err);
      });
  }, []);
  return (
    <div>
      {" "}
      <GetFeaturedProducts
        featuredProducts={featuredProducts}
        currPage={currPage}
        lastPage={lastPage}
        totalPages={totalPages}
        handlePagination={handlePagination}
        setfeaturedProducts={setfeaturedProducts}
        setCurrPage={setCurrPage}
      />
    </div>
  );
};

export default DisplayFeaturedProduct;
