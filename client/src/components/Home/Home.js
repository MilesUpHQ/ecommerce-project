import React from "react";
import "../ResetPassword/resetPassword.css";
import { useEffect, useState } from "react";
import axios from "../../utils/ajax-helper";
import Navbar from "../Navbar/Navbar";
import ProductList from "./ProductList";
import ErrorAlert from "../Common/ErrorAlert";
import { Carousel, Card } from "react-bootstrap";
import SearchProducts from "../Common/SearchProducts";
import imageData from "../../utils/imageData";
import SimpleNavBar from "../SimpleNavBar/SimpleNavBar";

const Home = () => {
  let [featuredProducts, setfeaturedProducts] = useState([]);
  const [currPage, setCurrPage] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [message, setMessage] = useState(null);
  const [imgArray, setimgArray] = useState([]);
  const [searchItem, setSearchItem] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handlePagination = (page) => {
    axios
      .get(`/featured_products?page=${page}`)
      .then((res) => {
        setfeaturedProducts(res.data.featuredProducts);
        setimgArray(res.data.imgArray);
        setCurrPage(res.data.currPage);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again", err);
      });
  };

  const handleSearchFilter = (value) => {
    setSearchInput(value);
  };

  useEffect(async () => {
    axios
      .get("/featured_products")
      .then((res) => {
        setCurrPage(res.data.currPage);
        setLastPage(res.data.lastPage);
        setTotalPages(res.data.totalPages);
        if (res.data.featuredProducts.length == 0) {
          setMessage(
            "Sorry !! We don't have any products show ,Please ask admin to add products"
          );
        }
        setfeaturedProducts(res.data.featuredProducts);
        setimgArray(res.data.imgArray);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again", err);
      });
  }, []);

  return (
    <div>
      {message && (
        <div>
          <SimpleNavBar />
          <Card className="messageCard">
            <h2 style={{ fontFamily: "serif", textShadow: "2px 2px #FF0000" }}>
              {message}
            </h2>
          </Card>
        </div>
      )}
      {featuredProducts.length > 0 && (
        <div>
          <Navbar
            searchItem={searchItem}
            setSearchItem={setSearchItem}
            placeholder={"Search for products"}
            handleSearchFilter={handleSearchFilter}
          />
          {searchItem.length > 0 || searchInput !== null ? (
            <>
              <br />
              <SearchProducts
                searchItem={searchItem}
                searchInput={searchInput}
              />
            </>
          ) : (
            <>
              {errorMsg && <ErrorAlert msg={errorMsg} />}
              {featuredProducts && (
                <div>
                  <Carousel className="carouselItem">
                    {imageData &&
                      imageData.map((imageUrl) => {
                        return (
                          <Carousel.Item interval={1000}>
                            <img
                              className="d-block w-100"
                              src={imageUrl}
                              className="imageSlide"
                            />
                          </Carousel.Item>
                        );
                      })}
                  </Carousel>

                  <div className="mainContainer">
                    <ProductList
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
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
