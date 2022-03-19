import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Card, Button, Col, Container, Row, Carousel } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import Pagination from "../Common/Pagination";
import "../Home/home.css";

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
              <Col key={featuredProduct.id}>
                <Card className="listCard" style={{ width: "300px" }}>
                  <a href={`/product/view/${featuredProduct.product_id}`}>
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
                      <Card.Text className="featuredProductDescription">
                        {featuredProduct.description}
                      </Card.Text>
                      <Card.Text className="featuredProductDescription">
                        Price : Rs.{featuredProduct.price}
                      </Card.Text>
                    </Card.Body>
                  </a>
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
