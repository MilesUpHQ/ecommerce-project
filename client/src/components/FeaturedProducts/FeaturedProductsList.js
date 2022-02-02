import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Card, Button, Col, Container, Row, Carousel } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import Pagination from "./Pagination";

const FeaturedProductsList = ({
  featuredProducts,
  currPage,
  lastPage,
  totalPages,
  handlePagination,
  loading,
  imgArray,
}) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div style={{ marginTop: "50px", marginLeft: "5%" }}>
      <Container>
        <Row>
          {featuredProducts.map((featuredProduct) => {
            return (
              <Col>
                <Card style={{ width: "18rem" }}>
                  <Carousel>
                    {imgArray.map((image_url) => {
                      return (
                        <Carousel.Item interval={1000}>
                          <img
                            className="d-block w-100"
                            src={image_url}
                            alt={featuredProduct.name}
                            style={{ height: "300px" }}
                          />
                        </Carousel.Item>
                      );
                    })}
                  </Carousel>
                  <Card.Body>
                    <Card.Title style={{ float: "left", marginLeft: "60px" }}>
                      {featuredProduct.name}{" "}
                    </Card.Title>
                    <Card.Text style={{ marginLeft: "200px" }}>
                      <FaHeart style={{ fontSize: "20px", color: "red" }} />
                    </Card.Text>
                    <br />
                    <Card.Text style={{ marginLeft: "20%" }}>
                      {featuredProduct.description}
                    </Card.Text>
                    <Card.Text style={{ marginLeft: "20%" }}>
                      Price : Rs.{featuredProduct.price}
                    </Card.Text>
                    <Button
                      style={{ float: "left", marginLeft: "5%" }}
                      variant="primary"
                    >
                      Add to cart
                    </Button>
                    <br />
                    <a
                      style={{ marginLeft: "20px", color: "black" }}
                      href={`/view_product/${featuredProduct.product_id}`}
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

export default FeaturedProductsList;
