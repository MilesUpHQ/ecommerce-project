import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/ajax-helper";
import ErrorMessages from "./ErrorMessages";
import Pagination from "../../Common/Pagination";
import "../../Common/css/pagination.css";

const DisplayProducts = ({}) => {
  const navigate = useNavigate();
  const [display, setdisplay] = useState([]);
  const [Errormsg, setErrormsg] = useState(null);
  const [currPage, setCurrPage] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  useEffect(() => {
    axios
      .get("/admin/productsList")
      .then((res) => {
        console.log(res.data.products);
        setdisplay(res.data.products);
        setCurrPage(res.data.currPage);
        setLastPage(res.data.lastPage);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        setErrormsg("Sorry! Something went wrong. Please Try again");
      });
  }, []);
  function handleClick() {
    navigate('/admin/products/add')
  }
  const handlePagination = (page) => {
    axios
      .get(`/admin/products?page=${page}`)
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
              <button  className="btn btn-primary float-right" onClick={handleClick}>
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
                      {display.map((display) => (
                        <tr>
                          <td className="py1">{display.name}</td>
                          <td>{display.description}</td>
                          <td>{display.size}</td>
                          <td>{display.price}</td>
                          <td>
                            <a
                              href={`/admin/products/${display.id}/view`}
                              type="button"
                              className="btn btn-info btn-small mr-2"
                            >
                              <i className="fas fa-eye"></i> View
                            </a>
                            <a
                              href={`/admin/product/${display.id}/update`}
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
