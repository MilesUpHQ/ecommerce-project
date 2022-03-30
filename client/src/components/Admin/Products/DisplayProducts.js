import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/ajax-helper";
import ErrorMessages from "./ErrorMessages";
import Pagination from "../../Common/Pagination";
import "../../Common/css/pagination.css";
import { Spinner } from "react-bootstrap";

const DisplayProducts = ({}) => {
  const navigate = useNavigate();
  const [display, setdisplay] = useState([]);
  const [Errormsg, setErrormsg] = useState(null);
  const [currPage, setCurrPage] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    axios
      .get("/admin/productsList")
      .then((res) => {
        console.log("dwsde",res.data.products);
        setdisplay(res.data.products);
        setCurrPage(res.data.currPage);
        setLastPage(res.data.lastPage);
        setTotalPages(res.data.totalPages);
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        setErrormsg("Sorry! Something went wrong. Please Try again");
      });
  }, []);
  function handleClick() {
    navigate('/admin/products/add')
  }
  const handlePagination = (page) => {
    axios
      .get(`/admin/productsList?page=${page}`)
      .then((res) => {
        setdisplay(res.data.products);
        setCurrPage(res.data.currPage);
      })
      .catch((err) => {
        setErrormsg("Sorry! Something went wrong. Please Try again");
      });
  };
  const deleteProduct = (id, variantid, name) => {
    if (window.confirm(`Are you sure! Delete ${name} Product?`)) {
      axios
        .delete("/delete_product", { params: { id } })
        .then((res) => {
          let newProducts = [...display];
          newProducts = newProducts.filter((product) => product.id !== id);
          setdisplay(newProducts);
        })
        .catch((err) => {
          setErrormsg(`Sorry! Couldn't delete product ${name}`);
        });
    }
  };

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="contanier">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
              <button  className="btnx  float-right" onClick={handleClick}>
                +Add Product</button>
                <h4 className="card-title">Products </h4>
                <p className="card-description">Listed Products</p>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Size</th>
                        <th>Amount</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!isLoading && display.map((display) => (
                        <tr key={display.id}>
                          <td className="py1">{display.name}</td>
                          <td>{display.description}</td>
                          <td>{display.size}</td>
                          <td>{display.price}</td>
                          <td>
                            <a
                              href={`/admin/product/${display.id}/add/variant`}
                              type="button"
                              className="btn btn-info btn-small mr-2"
                            >
                              Add Variant
                            </a>
                            <a
                              href={`/admin/products/${display.variantid}/view`}
                              type="button"
                              className="btn btn-info btn-small mr-2"
                            >
                              <i className="fas fa-eye"></i> View
                            </a>
                            <a
                              href={`/admin/product/${display.variantid}/update`}
                              type="button"
                              className="btn btn-light btn-small mr-2"
                            >
                              <i className="fas fa-edit"></i> Edit
                            </a>
                            <a
                              type="button"
                              onClick={() =>
                                deleteProduct(
                                  display.id,
                                  display.variantid,
                                  display.name
                                )
                              }
                              className="btn btn-danger btn-small"
                            >
                              <i className="fas fa-trash"></i> Delete
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {isLoading && <Spinner className="spinner" animation="grow" />}
                </div>
              </div>
            </div>
          </div>
          <Pagination
            currPage={currPage}
            lastPage={lastPage}
            totalPages={totalPages}
            handlePagination={handlePagination}
          />
        </div>
      </div>
    </div>
  );
};
export default DisplayProducts;
