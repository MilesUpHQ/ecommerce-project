import React, { useState, useEffect } from "react";
import axios from "../../../utils/ajax-helper";
import ErrorMessages from "./ErrorMessages";
import "../../Common/css/admin-style.css";
import "../css/product.css";
import { useParams } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ProductInfo = () => {
  let { id } = useParams("id");
  const [product, setProduct] = useState({});
  const [errormsg, setErrormsg] = useState(null);
  useEffect(() => {
    axios
      .get(`/admin/product/${id}`)
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
          <ol className="breadcrumb bg-white">
            <li className="breadcrumb-item">
              <a href="/admin/products">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Product Info
            </li>
          </ol>
        </nav>
        <div id="leftCol" className="a-column a-span4 dp_aib_left_column_t1">
          <div className="image-space">
            <h2 className="pdp-title">{product.name}</h2>
            <h3 className="pdp-name">{product.description}</h3>
            <img
              className="rounded-circle z-depth-2"
              alt="75x75"
              src={BASE_URL + "/" + product.image_url}
              data-holder-rendered="true"
            />
          </div>
        </div>
        <div className="view-user p-5">
          <div className="row mb-5">
            <div className="col text-center">
              <h3>
                <b>Product Information</b>
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <table className="table">
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

export default ProductInfo;
