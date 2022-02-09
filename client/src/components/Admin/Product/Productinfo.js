import React, { useState, useEffect } from "react";
import axios from "../../../utils/ajax-helper";
import ErrorMessages from "./ErrorMessages";

const Productinfo = (props) => {
  const [product, setProduct] = useState({});
  const [errormsg, setErrormsg] = useState(null);
  useEffect(() => {
    axios
      .get(`/product_info/${props.id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        setErrormsg("Sorry! Something went wrong. Please Try again");
      });
  }, []);
  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/admin/products">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Product_Info
            </li>
          </ol>
        </nav>
        <div id="leftCol" className="a-column a-span4 dp_aib_left_column_t1">
          <div class="image-space">
            <h1 class="pdp-title">Levis</h1>
            <h1 class="pdp-name">Men Beige Solid Slim Fit Chino Trousers</h1>
          </div>
        </div>
        <div class="view-user p-5">
          <div class="row mb-5">
            <div class="col text-center">
              <h3>
                <b>Product Information</b>
              </h3>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Size</th>
                    <th scope="col">Colour</th>
                    <th scope="col">Type</th>
                    <th scope="col">Price</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <th scope="row">{product.name}</th>
                      <td>{product.size}</td>
                      <td>{product.color}</td>
                      <td>{product.type}</td>
                      <td>{product.price}</td>
                      <td>{product.description}</td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productinfo;