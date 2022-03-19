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
import "../Home/home.css";

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
  const [addToCart, setAddToCart] = React.useState(false);
  const [updateNavbar, setUpdateNavbar] = React.useState(false);
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
  const handleAddToCart = (id) => {
    setAddToCart(id);
    setUpdateNavbar(true);
    setTimeout(() => {
      setAddToCart(false);
      setUpdateNavbar(false);
    }, 2000);
  };

  return (
    <div>
      {message && (
        <div>
          <SimpleNavBar />
          <Card className="messageCard">
            <h2 className="homePagemessage">{message}</h2>
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
                  <Carousel>
                    {imageData &&
                      imageData.map((imageUrl) => {
                        return (
                          <Carousel.Item interval={1000}>
                            <img className="slideImage" src={imageUrl} />
                          </Carousel.Item>
                        );
                      })}
                  </Carousel>
                  <ProductList
                    featuredProducts={featuredProducts}
                    currPage={currPage}
                    lastPage={lastPage}
                    totalPages={totalPages}
                    handlePagination={handlePagination}
                    setfeaturedProducts={setfeaturedProducts}
                    setCurrPage={setCurrPage}
                    handleAddToCart={handleAddToCart}
                  />
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
