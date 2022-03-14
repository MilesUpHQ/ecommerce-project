import React from "react";
import { useNavigate } from "react-router";
import "./ProductsCatalog.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const ProductsList = (props) => {
  const navigate = useNavigate();
  return (
    <>
      {props.products.length > 0 ? (
        props.products.map((product) => (
          <div class="col-md-6 col-lg-4 col-xl-3">
            <div class="single-product">
              <div
                class="part-1"
                style={{
                  background:
                    "url(" +
                    BASE_URL +
                    "/" +
                    product.image_url +
                    ") center no-repeat",
                  backgroundSize: "cover",
                  transition: " all 0.3s",
                }}
              >
                <span class="new">new</span>
                <ul>
                  <li>
                    <a onClick={() => props.handleAddToCart(product.id)}>
                      <i class="fas fa-shopping-cart"></i>
                    </a>
                  </li>
                  <li>
                    <a>
                      <i class="fas fa-heart"></i>
                    </a>
                  </li>
                  <li>
                    <a onClick={() => navigate(`/product/view/${product.id}`)}>
                      <i class="fas fa-expand"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="part-2">
                <h3 class="product-title">{product.name}</h3>
                <h4 class="product-old-price">₹{product.price + 100}</h4>
                <h4 class="product-price">₹{product.price}</h4>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="noProducts">
          <h1>No Products Found in the category</h1>
        </div>
      )}
    </>
  );
};

export default ProductsList;
