import React from "react";
import { useNavigate } from "react-router";

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
  handleAddToCart,
}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  return (
    <div>
      <section className="section-products">
        <div className="container">
          <>
            <div className="row">
              {featuredProducts.map((featuredProduct) => (
                <React.Fragment key={featuredProduct.id}>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="single-product">
                      <div
                        className="part-1"
                        style={{
                          background:
                            "url(" +
                            BASE_URL +
                            "/" +
                            featuredProduct.image_url +
                            ") center no-repeat",
                          // backgrou   ndSize: "cover",
                          transition: " all 0.3s",
                        }}
                      >
                        <span className="new">new</span>
                        <ul>
                          <li>
                            <a
                              onClick={() =>
                                handleAddToCart(featuredProduct.product_id)
                              }
                            >
                              <i className="fas fa-shopping-cart"></i>
                            </a>
                          </li>
                          <li>
                            <a>
                              <i className="fas fa-heart"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() =>
                                navigate(
                                  `/product/view/${featuredProduct.product_id}`
                                )
                              }
                            >
                              <i className="fas fa-expand"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <a href={`/product/view/${featuredProduct.product_id}`}>
                        <div
                          className="part-2"
                          onClick={() =>
                            navigate(
                              `/product/view/${featuredProduct.product_id}`
                            )
                          }
                        >
                          <h3
                            className="product-title"
                            style={{ color: "black" }}
                          >
                            {featuredProduct.name}
                          </h3>
                          <h4
                            className="product-old-price"
                            style={{ color: "black" }}
                          >
                            ₹{featuredProduct.price + 100}
                          </h4>
                          <h4
                            className="product-price"
                            style={{ color: "black" }}
                          >
                            ₹{featuredProduct.price}
                          </h4>
                        </div>
                      </a>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </>
        </div>
      </section>
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
