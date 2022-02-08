import React from "react";
import GetProducts from "./GetProducts";
import { useEffect, useState } from "react";
import axios from "../../utils/ajax-helper";
import ErrorAlert from "../FeaturedProducts/ErrorAlert";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

const NewFeaturedProduct = () => {
  let [products, setProducts] = useState([]);
  const [currPage, setCurrPage] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");

  const handleFunction = () => {
    console.log("input ::::::::::::::;", input);
    if (input.length < 3) {
      return;
    }
    axios
      .post("/products", {
        name: input,
      })
      .then((res) => {
        console.log("resssssssssssssssssssss :", res);
      })
      .catch((err) => {
        console.log("err ::::::::::::::::::::::::::::", err);
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
        setErrorMsg("Sorry! Something went wrong. Please Try again", err);
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
        console.log("resssssssssss :", res);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again", err);
      });
  }, []);

  return (
    <div>
      <form className="forms-sample">
        <div className="form-group">
          <table className="table table-hover">
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
