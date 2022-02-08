import React from "react";
import GetProducts from "./GetProducts";
import { useEffect, useState } from "react";
import axios from "../../utils/ajax-helper";
import "./addFeaturedProduct.css";

const NewFeaturedProduct = () => {
  let [products, setProducts] = useState([]);
  const [currPage, setCurrPage] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [message, setMessage] = useState(null);
  const [input, setInput] = useState("");

  const handleFunction = () => {
    if (input.length < 3) {
      return;
    }
    axios
      .post("/products", {
        name: input,
      })
      .then((res) => {
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
      .get(`/products?page=${page}`)
      .then((res) => {
        setProducts(res.data.products);
        setCurrPage(res.data.currPage);
      })
      .catch((err) => {
        setMessage("Sorry! Something went wrong. Please Try again", err);
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      });
  };

  useEffect(async () => {
    axios
      .get("/products")
      .then((res) => {
        setCurrPage(res.data.currPage);
        setLastPage(res.data.lastPage);
        setTotalPages(res.data.totalPages);
        setProducts(res.data.products);
      })
      .catch((err) => {
        setMessage("Sorry! Something went wrong. Please Try again", err);
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      });
  }, []);

  return (
    <div>
      <form className="forms-sample">
        <div className="form-group">
          <table className="table table-hover">
            {message && <thead className="messageHead">{message}</thead>}
            <tbody>
              <tr>
                <td style={{ border: 0 }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={"product Name"}
                    value={input}
                    minLength={3}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </td>
                <td style={{ border: 0 }}>
                  <button
                    type="button"
                    className={
                      "btn btn-primary btn-icon-text mt-1 " +
                      `${input.length < 3 ? "disabled" : ""}`
                    }
                    onClick={handleFunction}
                  >
                    Submit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>

      <br />
      <GetProducts
        products={products}
        currPage={currPage}
        lastPage={lastPage}
        totalPages={totalPages}
        handlePagination={handlePagination}
        setProducts={setProducts}
        setCurrPage={setCurrPage}
      />
    </div>
  );
};

export default NewFeaturedProduct;
