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
                <Container className="container">
                  <Row>
                    <Col>
                      <div className="imageDiv">
                        <img
                          className="image"
                          src={BASE_URL + "/" + product.image_url}
                        />
                      </div>{" "}
                    </Col>
                    <Col>
                      <Card>
                        {" "}
                        <Card.Body>
                          <Card.Title>
                            <h3 className="title"> {product.name} </h3>
                          </Card.Title>
                          <h4 className="text1">{product.description}</h4>
                          <br />

                          <h4 className="text1">Rs.{product.price}</h4>
                          <br />

                          <Card.Text className="text2">
                            <h4 className="text3">Size</h4> :
                          </Card.Text>
                          <h4 className="text1">{product.size}</h4>
                          <br />

                          <Card.Text className="text2">
                            <h4 className="text3">Color</h4> :
                          </Card.Text>
                          <h4 className="text1">{product.color}</h4>
                          <br />

                          <br />
                          <form>
                            <label className="label">Quantity</label>
                            <input
                              type="text"
                              pattern="[0-9]*"
                              min="1"
                              value="1"
                              step="1"
                              onkeydown="return false"
                              name="name"
                              className="cartInput"
                            />
                            <Button
                              type="submit"
                              className="cartButton"
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
              </React.Fragment>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
