import React from "react";
import { useNavigate } from "react-router";
import "./ProductsCatalog.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function ProductsCatalog(props) {
  const navigate = useNavigate();
  return (
    <>
      <section class="section-products">
        <div class="container">
          {props.products.length > 0 ? (
            <>
              <div class="row justify-content-center text-center">
                <div class="col-md-8 col-lg-6">
                  <div class="header">
                    <h3>{props.title}</h3>
                    <h2>Popular Products</h2>
                  </div>
                </div>
              </div>
              <div class="row">
                {props.products.map((product) => (
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
                            <a
                              onClick={() => props.handleAddToCart(product.id)}
                            >
                              <i class="fas fa-shopping-cart"></i>
                            </a>
                          </li>
                          <li>
                            <a>
                              <i class="fas fa-heart"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() =>
                                navigate(`/product/view/${product.id}`)
                              }
                            >
                              <i class="fas fa-expand"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div
                        class="part-2"
                        onClick={() => navigate(`/product/view/${product.id}`)}
                      >
                        <h3 class="product-title">{product.name}</h3>
                        <h4 class="product-old-price">
                          ₹{product.price + 100}
                        </h4>
                        <h4 class="product-price">₹{product.price}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div class="header  text-center">
              <h3>
                No Products Found :( <br />
                <br />
                Please Add Some Products
              </h3>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
