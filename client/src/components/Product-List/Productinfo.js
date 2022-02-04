import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "../../utils/ajax-helper";
import ErrorMessages from "./ErrorMessages";

const Productinfo = (props) => {

  const [product, setProduct] = useState([]);
  const [errormsg, setErrormsg] = useState(null);
  useEffect(() => {
    console.log("idd",props.id);
    axios
      .get(`/product_info/${props.id}`)
      .then((res) => {
        console.log("resss",res);
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
            <a href="/display-products">Home</a>
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
      <div className="a-column a-span8 dp_aib_right_column_t1 a-span-last">
      <div className="image-info">
      <div id="titleSection" className="a-section a-spacing-none">
         <h1 id="title" class="a-size-large a-spacing-none"> 
         <span id="productTitle" className="a-size-large product-title-word-break">Allen Solly Men's Sweatshirt</span></h1> 
         <div id="expandTitleToggle" className="a-section a-spacing-none expand aok-hidden">
        </div> 
         </div>
        </div>
      </div>
      </div>
    </div>
  
  );
};

export default Productinfo;
