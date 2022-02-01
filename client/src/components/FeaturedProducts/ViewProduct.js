import React from "react";
import { useEffect, useState } from "react";
import axios from "../../utils/ajax-helper";
import Navbar from "./Navbar";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import SimpleImageSlider from "react-simple-image-slider";

const ViewProduct = () => {
  let [product, setProduct] = useState([]);
  let [category, setCategory] = useState("");
  let [colors, setColors] = useState([]);
  let [sizes, setSizes] = useState([]);
  let [reviews, setReviews] = useState([]);
  let [image_urls, setImage_url] = useState([]);

  let id = window.location.pathname.substring(14);
  const images = [
    {
      url: "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2378362/2018/6/9/270e0a7e-365b-4640-9433-b269c60bf3061528527188563-Moda-Rapido-Men-Maroon-Printed-Round-Neck-T-shirt-3811528527-1.jpg",
    },
    {
      url: "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2378362/2018/6/9/405568f1-c3c1-4713-9c38-6dd95ac962d31528527188543-Moda-Rapido-Men-Maroon-Printed-Round-Neck-T-shirt-3811528527-2.jpg",
    },
    {
      url: "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2378362/2018/6/9/33523035-65f5-4fcb-b7a5-4062e656d10b1528527188511-Moda-Rapido-Men-Maroon-Printed-Round-Neck-T-shirt-3811528527-3.jpg",
    },
  ];
  const removeDuplicate = (array) => {
    var dups = [];
    var arr = array.filter(function (el) {
      if (dups.indexOf(el.color || el.size) == -1) {
        dups.push(el.color || el.size);
        return true;
      }
      return false;
    });
    return arr;
  };
  function toBase64(arr) {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  }

  useEffect(async () => {
    axios
      .get(`/products/${id}`)
      .then((response) => {
        console.log("response :", response.data);
        setCategory(response.data.categories[0].name);
        setProduct(response.data.product[0]);
        // console.log("response.data.colors :", response.data.colors);
        let color = removeDuplicate(response.data.colors);
        setColors(color);
        // console.log("colors :", colors);
        let size = removeDuplicate(response.data.sizes);
        // console.log("size :", size);
        setSizes(size);
        setImage_url(response.data.images);
        console.log("image_urls :", image_urls);
        setReviews(response.data.reviews);
      })
      .catch((err) => {
        console.log("err ", err);
      });
  }, []);

  return (
    <div style={{ backgroundColor: "#fcf0e2" }}>
      {product && category && sizes && colors && image_urls && reviews && (
        <div>
          <Navbar />
          <br />
          <br />
          <hr />
          <Card style={{ width: "100%", height: "60px" }}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="/">
                      Home /
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      {category} /
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </Card>
          <hr />
          <Card style={{ width: "58rem", left: "30px" }}>
            <Container>
              <Row>
                <Col>
                  <SimpleImageSlider
                    width="100%"
                    height="300px"
                    images={images}
                    showBullets={true}
                    style={{ border: "solid 1px pink", float: "left" }}
                  />
                </Col>
                <Col>
                  <Card.Body>
                    <Card.Title style={{ float: "left", marginLeft: "60px" }}>
                      {product.name}{" "}
                    </Card.Title>
                    <Card.Text style={{ marginLeft: "100px" }}>
                      <FaHeart style={{ fontSize: "20px", color: "red" }} />
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
                            {sizes.map((size) => {
                              return (
                                <div>
                                  <input
                                    type="radio"
                                    value="Male"
                                    name={size.size}
                                  />{" "}
                                  {size.size}
                                </div>
                              );
                            })}
                          </div>
                        </Col>
                        <Col>
                          <Card.Text>Colors</Card.Text>
                          <hr />
                          <div>
                            {colors.map((colors) => {
                              return (
                                <div>
                                  <input
                                    type="radio"
                                    value="Male"
                                    name={colors.color}
                                  />{" "}
                                  {colors.color}
                                </div>
                              );
                            })}
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
                        style={{
                          border: "solid 1px blue",
                          borderRadius: "10px",
                          height: "40px",
                        }}
                      />
                      <Button type="submit" variant="primary">
                        Add to cart
                      </Button>
                    </form>
                    {/* <div>
                      {image_urls.map((image_url) => {
                        return (
                          <img
                            src={`data:image/png;base64,${toBase64(
                              image_url.image_url["data"]
                            )}`}
                            height="30px"
                            width="30px"
                          />
                        );
                      })}
                    </div> */}
                  </Card.Body>
                </Col>
              </Row>
              <hr />
              <Row style={{ width: "fit-content" }}>
                <Card.Text>Reviews</Card.Text>
                <Container>
                  {reviews.map((review) => {
                    return (
                      <div style={{ width: "100%" }}>
                        <Card.Text
                          style={{ float: "left", fontWeight: "bold" }}
                        >
                          {review.comment}
                        </Card.Text>
                        <Card.Text
                          style={{
                            float: "left",
                            marginLeft: "5px",
                            marginRight: "10px",
                          }}
                        >
                          with the rating of
                        </Card.Text>
                        <Card.Text
                          style={{
                            float: "left",
                            marginLeft: "5px",
                            marginRight: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {review.rating}
                        </Card.Text>
                        <Card.Text
                          style={{
                            float: "left",
                            marginLeft: "5px",
                            marginRight: "10px",
                          }}
                        >
                          by
                        </Card.Text>
                        <Card.Text
                          style={{ marginLeft: "5px", fontWeight: "bold" }}
                        >
                          {review.username}
                        </Card.Text>
                      </div>
                    );
                  })}
                </Container>
              </Row>
            </Container>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
