// display products by category with get id from params
import axios from "../../utils/ajax-helper";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductsByCategory.css";
import { FaHeart } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.css";

import { Card, Button, Col, Container, Row, Carousel } from "react-bootstrap";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function ProductsByCategory() {
  const [products, setProducts] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [searchItem, setSearchItem] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const categoryId = useParams().category;
  console.log("categoryId", categoryId);
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

  const handleSearch = (value) => {
    axios
      .get(`/typeahead-items?search_keyword=${value}`)
      .then((res) => {
        console.log(res);
        let array = res.data.map(({ id, name }) => ({
          label: name,
          value: id,
        }));
        setOptions(array);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (searchItem.length > 0) {
      axios
        .get(`/products-by-search?search_keyword=${searchItem[0].label}`)
        .then((res) => {
          setProducts(res.data);
          setSearchItem([]);
        })
        .catch((err) => console.log(err));
    }
  }, [searchItem]);

  return (
    <>
      <Navbar
        handleSearch={handleSearch}
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        options={options}
        placeholder={"Search for products"}
      />
      <div>
        <Container>
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
                  {console.log(product)}

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
                      {/* onclick redict to cart/add/id */}
                      <Button
                        className="cartButton"
                        variant="primary"
                        href={`/cart/add/${product.variant_id}`}
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
              // show no products found in category
              <div className="noProducts">
                <h1>No Products Found in the category</h1>
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
