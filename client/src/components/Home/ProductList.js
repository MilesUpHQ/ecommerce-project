import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Card, Button, Col, Container, Row, Carousel } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import Pagination from "./Pagination";

const ProductList = ({
  featuredProducts,
  currPage,
  lastPage,
  totalPages,
  handlePagination,
  loading,
  imgArray,
}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="listDiv">
      <Container>
        <Row>
          {featuredProducts.map((featuredProduct) => {
            return (
              <Col>
                <Card className="listCard" style={{ width: "300px" }}>
                  <Card.Img
                    variant="top"
                    src={BASE_URL + "/" + featuredProduct.image_url}
                    className="imgSlide"
                  />
                  <Card.Body>
                    <Card.Title className="featuredProductName">
                      {featuredProduct.name}{" "}
                    </Card.Title>
                    <Card.Text className="iconText">
                      <FaHeart className="icon" />
                    </Card.Text>
                    <br />
                    <Card.Text className="featuredProductContent">
                      {featuredProduct.description}
                    </Card.Text>
                    <Card.Text className="featuredProductContent">
                      Price : Rs.{featuredProduct.price}
                    </Card.Text>
                    <Button className="cartButton" variant="primary">
                      Add to cart
                    </Button>
                    <br />
                    <a
                      className="viewProduct"
                      href={`/product/view/${featuredProduct.product_id}`}
                    >
                      View Product
                    </a>
                  </Card.Body>
                </Card>
                <br />
              </Col>
            );
          })}
        </Row>
      </Container>
      <br />
      <Pagination
        currPage={currPage}
        lastPage={lastPage}
        totalPages={totalPages}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default ProductList;
