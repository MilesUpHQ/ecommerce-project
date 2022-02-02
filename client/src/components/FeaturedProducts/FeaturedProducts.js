import React from "react";
import "../ResetPassword/resetPassword.css";
import { useEffect, useState } from "react";
import axios from "../../utils/ajax-helper";
import SimpleImageSlider from "react-simple-image-slider";
import Navbar from "./Navbar";
import FeaturedProductsList from "./FeaturedProductsList";
import ErrorAlert from "./ErrorAlert";
import { Carousel } from "react-bootstrap";

const FeaturedProducts = () => {
  let [featuredProducts, setfeaturedProducts] = useState([]);
  const [currPage, setCurrPage] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [imgArray, setimgArray] = useState([]);

  const handlePagination = (page) => {
    axios
      .get(`/products?page=${page}`)
      .then((res) => {
        console.log("res :", res);
        setfeaturedProducts(res.data.featuredProducts);
        setimgArray(res.data.imgArray);
        setCurrPage(res.data.currPage);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again", err);
      });
  };
  useEffect(async () => {
    axios
      .get("/products")
      .then((res) => {
        console.log("res :", res);
        setCurrPage(res.data.currPage);
        setLastPage(res.data.lastPage);
        setTotalPages(res.data.totalPages);
        setfeaturedProducts(res.data.featuredProducts);
        setimgArray(res.data.imgArray);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again", err);
      });
  }, []);

  return (
    <div>
      {featuredProducts && (
        <div>
          <Navbar />
          <Carousel>
            {imgArray.map((image_url) => {
              return (
                <Carousel.Item interval={1000}>
                  <img
                    className="d-block w-100"
                    src={image_url}
                    style={{ height: "700px" }}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          {errorMsg && <ErrorAlert msg={errorMsg} />}
          <div style={{ backgroundColor: "#fcf0e2" }}>
            <FeaturedProductsList
              featuredProducts={featuredProducts}
              currPage={currPage}
              lastPage={lastPage}
              totalPages={totalPages}
              handlePagination={handlePagination}
              setfeaturedProducts={setfeaturedProducts}
              setCurrPage={setCurrPage}
              imgArray={imgArray}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;
