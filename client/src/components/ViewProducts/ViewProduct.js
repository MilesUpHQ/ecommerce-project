import React from "react";
import { useEffect, useState } from "react";
import axios from "../../utils/ajax-helper";
import Navbar from "../Navbar/Navbar";
import { Card, Button, Container, Row, Col, Carousel } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import ErrorAlert from "../Common/ErrorAlert";
import "../Home/home.css";
import SearchProducts from "../Common/SearchProducts";

const ViewProduct = () => {
  let [product, setProduct] = useState([]);
  let [category, setCategory] = useState("");
  let [colors, setColors] = useState([]);
  let [sizes, setSizes] = useState([]);
  let [reviews, setReviews] = useState([]);
  let [imageUrls, setImage_url] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchItem, setSearchItem] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

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

  return (
    <div className="mainContainer">
      {product && (
        <div>
          <Navbar
            searchItem={searchItem}
            setSearchItem={setSearchItem}
            placeholder={"Search for products"}
            handleSearchFilter={handleSearchFilter}
          />
          <br />
          <br />
          {errorMsg && <ErrorAlert msg={errorMsg} />}
          {searchItem.length > 0 || searchInput !== null ? (
            <SearchProducts searchItem={searchItem} searchInput={searchInput} />
          ) : (
            <>
              <Card className="containerCard">
                <Container>
                  <Row>
                    <Col>
                      <Card.Img
                        variant="top"
                        src={BASE_URL + "/" + product.image_url}
                        className="imgSlide"
                      />
                    </Col>
                    <Col>
                      <Card.Body>
                        <Card.Title className="productName">
                          {product.name}{" "}
                        </Card.Title>
                        <Card.Text className="iconText">
                          <FaHeart className="icon" />
                        </Card.Text>
                        <br />

                        <Card.Text>{product.description}</Card.Text>
                        <Card.Text>Price : Rs.{product.price}</Card.Text>
                        <Container>
                          <Row>
                            <Col>
                              <Card.Text>Sizes</Card.Text>
                              <hr />
                              <div>
                                {" "}
                                <div>
                                  <input
                                    type="radio"
                                    value="Male"
                                    name={product.size}
                                    defaultChecked
                                  />{" "}
                                  {product.size}
                                </div>
                              </div>
                            </Col>
                            <Col>
                              <Card.Text>Colors</Card.Text>
                              <hr />
                              <div>
                                <div>
                                  <input
                                    type="radio"
                                    value="Male"
                                    name={product.color}
                                    defaultChecked
                                  />{" "}
                                  {product.color}
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Container>
                        <br />
                        <form>
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
                          <Button type="submit" variant="primary">
                            Add to cart
                          </Button>
                        </form>
                      </Card.Body>
                    </Col>
                  </Row>
                  <hr />
                  <Row className="reviewsRow">
                    <Card.Text>Reviews</Card.Text>
                    <Container>
                      {reviews &&
                        reviews.map((review) => {
                          return (
                            <div className="reviewsDiv">
                              <Card.Text className="reviewComment">
                                {review.comment}
                              </Card.Text>
                              <Card.Text className="text1">
                                with the rating of
                              </Card.Text>
                              <Card.Text className="rating">
                                {review.rating}
                              </Card.Text>
                              <Card.Text className="text2">by</Card.Text>
                              <Card.Text className="username">
                                {review.username}
                              </Card.Text>
                            </div>
                          );
                        })}
                    </Container>
                  </Row>
                </Container>
              </Card>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
