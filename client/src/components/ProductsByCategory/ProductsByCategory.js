// display products by category with get id from params
import axios from "../../utils/ajax-helper";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductsByCategory.css";
import { FaHeart } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import Add from "../Cart/Add";

import {
  Card,
  Button,
  Col,
  Container,
  Row,
  Carousel,
  Nav,
} from "react-bootstrap";
import SearchProducts from "../Common/SearchProducts";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function ProductsByCategory() {
  const [products, setProducts] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [searchItem, setSearchItem] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState(null);
  const categoryId = useParams().category;
  const [addToCart, setAddToCart] = React.useState(false);
  const [updateNavbar, setUpdateNavbar] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/products/category/${categoryId}`);
        setProducts(data);
      } catch (error) {
        setErrorMsg("Sorry! Something went wrong. Please Try again", error);
      }
    };
    fetchData();
  }, [categoryId]);

  const handleAddToCart = (id) => {
    setAddToCart(id);
    setUpdateNavbar(true);
    setTimeout(() => {
      setAddToCart(false);
      setUpdateNavbar(false);
    }, 2000);
  };

  const handleSearchFilter = (value) => {
    setSearchInput(value);
  };

  return (
    <>
      {addToCart ? <Add id={addToCart} /> : null}
      <Navbar
        handleSearchFilter={handleSearchFilter}
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        placeholder={"Search for products"}
        updateNavbar={updateNavbar}
      />
      {/* <h1>Products By Category</h1> */}

      <br />
      {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : <></>}

      <div>
        <Container>
          {searchItem.length > 0 || searchInput !== null ? (
            <SearchProducts searchItem={searchItem} searchInput={searchInput} />
          ) : (
            <>
              <h1>Products By Category</h1>
              <div className="row">
                {errorMsg ? (
                  <div className="alert alert-danger">{errorMsg}</div>
                ) : (
                  <></>
                )}
                {/* {products.length > 0
            ? products.map((product) => (
                <div className="col-md-4" key={product.id}>
                  <div className="card mb-4 shadow-sm card-width">
                    <img
                      src={BASE_URL + "/" + product.image_url}
                      className="card-img-top card-img"
                      alt="product"
                    />
                    <div className="card-body">
                      <p className="card-text">{product.name}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="text-muted">${product.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null} */}

                {products.length > 0 ? (
                  products.map((product) => (
                    <Col>
                      <Card className="listCard">
                        <Card.Img
                          variant="top"
                          src={BASE_URL + "/" + product.image_url}
                          className="imgSlide"
                        />
                        <Card.Body>
                          <Card.Title className="featuredProductName">
                            {product.name}{" "}
                          </Card.Title>
                          <Card.Text className="iconText">
                            <FaHeart className="icon" />
                          </Card.Text>
                          <br />
                          <Card.Text className="featuredProductContent">
                            {product.description}
                          </Card.Text>
                          <Card.Text className="featuredProductContent">
                            Price : Rs.{product.price}
                          </Card.Text>
                          <Button
                            className="cartButton"
                            variant="primary"
                            onClick={() => handleAddToCart(product.id)}
                          >
                            Add to cart
                          </Button>
                          <br />
                          <a
                            className="viewProduct"
                            href={`/product/view/${product.id}`}
                          >
                            View Product
                          </a>
                        </Card.Body>
                      </Card>
                      <br />
                    </Col>
                  ))
                ) : (
                  <div className="noProducts">
                    <h1>No Products Found in the category</h1>
                  </div>
                )}
              </div>
            </>
          )}
        </Container>
      </div>
    </>
  );
}
