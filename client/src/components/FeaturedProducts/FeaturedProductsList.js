import React from "react";
import "../ResetPassword/resetPassword.css";
import { useEffect, useState } from "react";
import axios from "../../utils/ajax-helper";
import "bootstrap/dist/css/bootstrap.css";
import { Card, Button } from "react-bootstrap";
import { FaShoppingCart, FaHeart, FaPlus, FaMinus } from "react-icons/fa";
import SimpleImageSlider from "react-simple-image-slider";
import Navbar from "./Navbar";
import Pagination from "./Pagination";

const FeaturedProductsList = ({
  featuredProducts,
  currPage,
  lastPage,
  totalPages,
  handlePagination,
  setCategories,
  setCurrPage,
  loading,
}) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
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
  return (
    <div>
      {featuredProducts.map((featuredProduct) => {
        return (
          <Card style={{ width: "38rem" }}>
            <SimpleImageSlider
              width="100%"
              height="300px"
              images={images}
              showBullets={true}
              style={{ border: "solid 1px pink" }}
            />

            <Card.Body>
              <Card.Title style={{ float: "left", marginLeft: "60px" }}>
                {featuredProduct.name}{" "}
              </Card.Title>
              <Card.Text style={{ marginLeft: "100px" }}>
                <FaHeart style={{ fontSize: "20px", color: "red" }} />
              </Card.Text>
              <br />

              <Card.Text>{featuredProduct.description}</Card.Text>
              <Card.Text>Price : Rs.{featuredProduct.price}</Card.Text>
              <Button variant="primary">Add to cart</Button>
              <br />
              <a href={`/view_product/${featuredProduct.product_id}`}>
                View Product
              </a>
            </Card.Body>
          </Card>
        );
      })}
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
