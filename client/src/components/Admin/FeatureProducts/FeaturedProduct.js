import React from "react";
import { useEffect, useState } from "react";
import axios from "../../../utils/ajax-helper";
import "./featuredProduct.css";
import TypeAhead from "../../Common/TypeAhead";
import GetFeaturedProducts from "./GetFeaturedProduct";

const FeaturedProduct = () => {
  let [products, setProducts] = useState([]);
  let [featuredProducts, setfeaturedProducts] = useState([]);
  const [currPage, setCurrPage] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [message, setMessage] = useState(null);
  const [input, setInput] = useState([]);
  const [inputArray, setinputArray] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchItem, setSearchItem] = useState([]);

  const handleFunction = () => {
    axios
      .post("/admin/products", {
        name: input[0].value,
      })
      .then((res) => {
        if (res.data.message == "product already exists") {
          setMessage(res.data.message);
        }
        setInput([]);
        getFeaturedProducts();
        setIsOpen(false);
        setMessage(res.data.message);
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      })
      .catch((err) => {
        setMessage("oops !! something went wrong");
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      });
  };

  const handlePagination = (page) => {
    axios
      .get(`/featured_products?page=${page}`)
      .then((res) => {
        setfeaturedProducts(res.data.featuredProducts);
        setCurrPage(res.data.currPage);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again", err);
        setTimeout(() => {
          setErrorMsg(null);
        }, 6000);
      });
  };

  const handleSearch = (query) => {
    setIsLoading(true);
    axios
      .get(`/admin/featured_products/products?search=${query}`)
      .then((res) => {
        let array = res.data.map(({ id, name }) => ({
          label: name,
          value: id,
        }));
        setOptions(array);
        setIsLoading(false);
      })
      .catch((err) => {});
  };

  useEffect(async () => {
    getFeaturedProducts();
  }, []);

  function getFeaturedProducts() {
    axios
      .get("/featured_products")
      .then((res) => {
        setCurrPage(res.data.currPage);
        setLastPage(res.data.lastPage);
        setTotalPages(res.data.totalPages);
        if (res.data.featuredProducts.length == 0) {
          setErrorMsg("no featured products");
          setTimeout(() => {
            setErrorMsg(null);
          }, 6000);
        } else {
          setfeaturedProducts(res.data.featuredProducts);
        }
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again", err);
        setTimeout(() => {
          setErrorMsg(null);
        }, 6000);
      });
  }

  return (
    <React.Fragment>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="container">
            {message && <h2 className="messageHead">{message}</h2>}
            <div className="mainHead">
              <button
                type="button"
                className="btn btn-primary btn-icon-text"
                style={{ height: "fit-content" }}
                onClick={() => setIsOpen(true)}
              >
                Add to featured products
              </button>
            </div>
            {isOpen && (
              <form className="forms-sample">
                <div className="form-group">
                  <table className="table table-hover">
                    <tbody>
                      <tr>
                        <td style={{ border: 0 }}>
                          <div class="form-group">
                            <label for="products">Products</label>
                            <TypeAhead
                              multiple
                              options={options}
                              handleSearch={handleSearch}
                              setSearchItem={setInput}
                              searchItem={input}
                              isLoading={isLoading}
                              placeholder={"Choose a Parent Category..."}
                            />
                          </div>
                        </td>
                        <td style={{ border: 0 }}>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleFunction}
                            style={{ marginRight: "20px" }}
                          >
                            Submit
                          </button>

                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setIsOpen(null)}
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>
            )}
            <br />
            <br />
            {featuredProducts.length > 0 && (
              <>
                <h3>Featured Products</h3>
                <br />
                <GetFeaturedProducts
                  featuredProducts={featuredProducts}
                  currPage={currPage}
                  lastPage={lastPage}
                  totalPages={totalPages}
                  handlePagination={handlePagination}
                  setfeaturedProducts={setfeaturedProducts}
                  setCurrPage={setCurrPage}
                  setErrorMsg={setErrorMsg}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FeaturedProduct;
