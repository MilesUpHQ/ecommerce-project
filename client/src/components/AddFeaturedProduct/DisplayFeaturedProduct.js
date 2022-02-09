import React from "react";
import { useEffect, useState } from "react";
import axios from "../../utils/ajax-helper";
import GetFeaturedProducts from "./GetFeaturedProduct";
import ErrorAlert from "../FeaturedProducts/ErrorAlert";
import { Card } from "react-bootstrap";
import "../Admin/css/admin-style.css";

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
        setTimeout(() => {
          setErrorMsg(null);
        }, 6000);
      });
  };
  useEffect(async () => {
    axios
      .get("/featuredProducts")
      .then((res) => {
        setCurrPage(res.data.currPage);
        setLastPage(res.data.lastPage);
        setTotalPages(res.data.totalPages);
        if (res.data.featuredProducts.length == 0) {
          setErrorMsg("no featured products");
          setTimeout(() => {
            setErrorMsg(null);
          }, 6000);
        } else {
          setfeaturedProducts(res.data.featuredProducts);
        }
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again", err);
        setTimeout(() => {
          setErrorMsg(null);
        }, 6000);
      });
  }, []);
  return (
    <div>
      {" "}
      {errorMsg && (
        <Card>
          {" "}
          <ErrorAlert msg={errorMsg} />{" "}
        </Card>
      )}
      {featuredProducts.length > 0 && (
        <GetFeaturedProducts
          featuredProducts={featuredProducts}
          currPage={currPage}
          lastPage={lastPage}
          totalPages={totalPages}
          handlePagination={handlePagination}
          setfeaturedProducts={setfeaturedProducts}
          setCurrPage={setCurrPage}
          setErrorMsg={setErrorMsg}
        />
      )}
    </div>
  );
};

export default DisplayFeaturedProduct;
