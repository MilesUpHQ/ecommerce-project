import React from "react";
import { useNavigate } from "react-router";
import "./ProductsCatalog.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function ProductsCatalog(props) {
  const navigate = useNavigate();
  return (
    <>
      <section className="section-products">
        <div className="container">
          {props.products.length > 0 ? (
            <>
              <div className="row justify-content-center text-center">
                <div className="col-md-8 col-lg-6">
                  <div className="header">
                    <h3>{props.title}</h3>
                    <h2>Popular Products</h2>
                  </div>
                </div>
              </div>
              <div className="row">
                {props.products.map((product) => (
                  <div className="col-md-6 col-lg-4 col-xl-3" key={product.id}>
                    <div className="single-product">
                      <div
                        className="part-1"
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
                        <span className="new">new</span>
                        <ul>
                          <li>
                            <a
                              onClick={() => props.handleAddToCart(product.id)}
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
                                navigate(`/product/view/${product.id}`)
                              }
                            >
                              <i className="fas fa-expand"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div
                        className="part-2"
                        onClick={() => navigate(`/product/view/${product.id}`)}
                      >
                        <h3 className="product-title">{product.name}</h3>
                        <h4 className="product-old-price">
                          ₹{product.price + 100}
                        </h4>
                        <h4 className="product-price">₹{product.price}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="header  text-center">
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
