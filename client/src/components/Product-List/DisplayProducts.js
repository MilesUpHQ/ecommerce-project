import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "../../utils/ajax-helper";
import ErrorMessages from "./ErrorMessages";
import Pagination from "../Admin/Categories/Pagination";
import "../Admin/css/pagination.css"
const DisplayProducts = () => {
  const [display, setdisplay] = useState([]);
  const[Errormsg, setErrormsg]= useState(null);
  const [currPage, setCurrPage] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  useEffect(() => {
    axios
      .get("/admin/products")
      .then((res) => {
        console.log(res);
        setdisplay(res.data.products);
        setCurrPage(res.data.currPage);
        setLastPage(res.data.lastPage);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        setErrormsg("Sorry! Something went wrong. Please Try again");
      });
  }, []);
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

  return (
    <div className="main-panel">
   <div className="content-wrapper">
    <div className="contanier">
    <div class="col-lg-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Products </h4>
          <p class="card-description">Listed Products</p>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {display.map(display=>(
                 <tr>
                   <td className="py1">
                     {display.name}
                   </td>
                   <td>
                     {display.description}
                   </td>
                   <td>
                     {display.price}
                   </td>
                   <td>
                    {console.log(display)}
                   <a href={`/product_view/${display.id}`} type="button" class="btn btn-light btn-small"><i class="fas fa-eye"></i> View</a>
                   <a href={`/deleted/${display.id}`} type="button" class="btn btn-light btn-small"><i class="fas fa-trash"></i> Delete</a>
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
  ) ;
};
export default DisplayProducts;
