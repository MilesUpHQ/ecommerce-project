import React from "react";
import { useEffect, useState } from "react";
import axios from "../../utils/ajax-helper";
import Navbar from "../Navbar/Navbar";
import { Card, Button, Container, Row, Col, Carousel } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import ErrorAlert from "../Common/ErrorAlert";
import SearchProducts from "../Common/SearchProducts";
import Add from "../Cart/Add";
import "./viewProduct.css";

const ViewProduct = () => {
  let [product, setProduct] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchItem, setSearchItem] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [addToCart, setAddToCart] = React.useState(false);
  const [updateNavbar, setUpdateNavbar] = React.useState(false);

  let id = window.location.pathname.substring(14);

  useEffect(async () => {
    axios
      .get(`/featured_products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        setErrorMsg("Sorry we couldnot get procuct with error " + err);
      });
  }, []);

  const handleSearchFilter = (value) => {
    setSearchInput(value);
  };

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
      {addToCart ? <Add id={addToCart} /> : null}
      {product && (
        <div>
          <Navbar
            searchItem={searchItem}
            setSearchItem={setSearchItem}
            placeholder={"Search for products"}
            handleSearchFilter={handleSearchFilter}
            updateNavbar={updateNavbar}
          />
          {errorMsg && <ErrorAlert msg={errorMsg} />}
          {searchItem.length > 0 || searchInput !== null ? (
            <SearchProducts searchItem={searchItem} searchInput={searchInput} />
          ) : (
            <>
              <React.Fragment>
                <div className="main-div">
                  <div>
                    <Container>
                      <Row>
                        <Col>
                          <div class="imageDiv">
                            <img
                              style={{ width: "100%" }}
                              src={BASE_URL + "/" + product.image_url}
                            />
                          </div>{" "}
                        </Col>
                        <Col>
                          <Card>
                            {" "}
                            <Card.Body>
                              <Card.Title>
                                <h3
                                  style={{
                                    textShadow: " 1px 1px 3px blue",
                                  }}
                                >
                                  {" "}
                                  {product.name}{" "}
                                </h3>
                              </Card.Title>
                              <h4
                                style={{
                                  color: "black",
                                  textShadow: "1px 1px 2px gray",
                                }}
                              >
                                {product.description}
                              </h4>
                              <br />

                              <h4 style={{ textShadow: "1px 1px 2px gray" }}>
                                Rs.{product.price}
                              </h4>
                              <br />

                              <Card.Text
                                style={{ float: "left", marginRight: "10px" }}
                              >
                                <h4
                                  style={{
                                    textDecoration: "underline",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                >
                                  Size
                                </h4>{" "}
                                :
                              </Card.Text>
                              <h4
                                style={{
                                  color: "black",
                                  textShadow: "1px 1px 2px gray",
                                }}
                              >
                                {product.size}
                              </h4>
                              <br />

                              <Card.Text
                                style={{ float: "left", marginRight: "10px" }}
                              >
                                <h4
                                  style={{
                                    textDecoration: "underline",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                >
                                  Color
                                </h4>{" "}
                                :
                              </Card.Text>
                              <h4
                                style={{
                                  color: "black",
                                  textShadow: "1px 1px 2px gray",
                                }}
                              >
                                {product.color}
                              </h4>
                              <br />

                              <br />
                              <form>
                                <label
                                  style={{
                                    fontStyle: "italic",
                                    marginRight: "20px",
                                  }}
                                >
                                  Quantity
                                </label>
                                <input
                                  type="text"
                                  pattern="[0-9]*"
                                  min="1"
                                  value="1"
                                  step="1"
                                  onkeydown="return false"
                                  name="name"
                                  className="cartInput"
                                  style={{
                                    border: "none",
                                  }}
                                />
                                <Button
                                  type="submit"
                                  style={{
                                    backgroundColor: "white",
                                    color: "black",
                                  }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleAddToCart(id);
                                  }}
                                >
                                  Add to cart
                                </Button>
                              </form>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </div>
              </React.Fragment>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
