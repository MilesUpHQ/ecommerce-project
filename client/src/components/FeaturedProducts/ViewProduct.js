import React from "react";
import { useEffect, useState } from "react";
import axios from "../../utils/ajax-helper";
import Navbar from "./Navbar";
import { Card, Button } from "react-bootstrap";
import { FaShoppingCart, FaHeart, FaPlus, FaMinus } from "react-icons/fa";
import SimpleImageSlider from "react-simple-image-slider";

const ViewProduct = () => {
  let [featuredProduct, setfeaturedProduct] = useState([]);
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
  let imgArray = [];
  console.log("id :::::::::::::::::::::::::::::::::::::", id);
  useEffect(async () => {
    axios
      .get(`/view_Product/${id}`)
      .then((response) => {
        let image_url = [];
        for (let i = 0; i < response.data.length; i++) {
          image_url.push(response.data[i].image_url);
        }
        console.log("getting image_url", image_url);
        for (let i = 0; i < image_url.length; i++) {
          let url = {
            url: image_url[i],
          };
          imgArray.push(url);
        }
        console.log("getting imgArray", imgArray);
        setfeaturedProduct(response.data[0]);
        console.log("featured product", featuredProduct);
      })
      .catch((err) => {
        console.log("erro in getting featuredProducts", err);
      });
  }, []);
  return (
    <div>
      <Navbar />
      <br />
      <hr />
      <Card style={{ width: "18rem" }}>
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
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewProduct;
