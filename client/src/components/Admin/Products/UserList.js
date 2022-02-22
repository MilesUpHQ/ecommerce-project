import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/ajax-helper";
import ErrorMessages from "./ErrorMessages";
import Pagination from "../Categories/Pagination";
import "../css/admin-style.css";
import "../css/pagination.css"

const UserList = ({}) => {

  const [display, setdisplay] = useState([]);  
  const[Errormsg, setErrormsg]= useState(null);
  const [currPage, setCurrPage] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  useEffect(() => {
    axios
      .get("/admin/userData")
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
      <h1>Users</h1>
      <div className="content-wrapper">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css"
          integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA="
          crossorigin="anonymous"
        />
        <div class="container mt-3 mb-4 ">
          <div class="col-lg-9 mt-4 mt-lg-0 w-100">
            <div class="row">
              <div class="col-md-12 ">
                <div className="user-dashboard-info-box table-responsive mb-0 bg-white w-1000 p-4 shadow-smm">
                  <table class="table manage-candidates-top mb-0">
                    <thead>
                      <tr>
                        <th>Candidate Name</th>
                        <th class="text-center">Status</th>
                        <th class="action text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="candidates-list">
                        <td class="title">
                          <div class="thumb">
                            <img
                              class="img-fluid"
                              src="https://bootdey.com/img/Content/avatar/avatar7.png"
                              alt=""
                            />
                          </div>
                          <div class="candidate-list-details">
                            <div class="candidate-list-info">
                              <div class="candidate-list-title">
                                <h5 class="mb-0">
                                  <a href="#">Brooke Kelly</a>
                                </h5>
                              </div>
                              <div class="candidate-list-option">
                                <ul class="list-unstyled">
                                  <li>
                                    <i class="fas fa-filter pr-1"></i>
                                    Information Technology
                                  </li>
                                  <li>
                                    <i class="fas fa-map-marker-alt pr-1"></i>
                                    Rolling Meadows, IL 60008
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="candidate-list-favourite-time text-center">
                          <a
                            class="candidate-list-favourite order-2 text-danger"
                            href="#"
                          >
                            <i class="fas fa-heart"></i>
                          </a>
                          <span class="candidate-list-time order-1">
                            Admin
                          </span>
                        </td>
                        <td>
                          <ul class="list-unstyled mb-0 d-flex justify-content-end">
                            <li>
                              <a
                                href="#"
                                class="text-primary"
                                data-toggle="tooltip"
                                title=""
                                data-original-title="view"
                              >
                                <i class="far fa-eye"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                class="text-info"
                                data-toggle="tooltip"
                                title=""
                                data-original-title="Edit"
                              >
                                <i class="fas fa-pencil-alt"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                class="text-danger"
                                data-toggle="tooltip"
                                title=""
                                data-original-title="Delete"
                              >
                                <i class="far fa-trash-alt"></i>
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr class="candidates-list">
                        <td class="title">
                          <div class="thumb">
                            <img
                              class="img-fluid"
                              src="https://bootdey.com/img/Content/avatar/avatar1.png"
                              alt=""
                            />
                          </div>
                          <div class="candidate-list-details">
                            <div class="candidate-list-info">
                              <div class="candidate-list-title">
                                <h5 class="mb-0">
                                  <a href="#">Ronald Bradley</a>
                                </h5>
                              </div>
                              <div class="candidate-list-option">
                                <ul class="list-unstyled">
                                  <li>
                                    <i class="fas fa-filter pr-1"></i>Human
                                    Resources
                                  </li>
                                  <li>
                                    <i class="fas fa-map-marker-alt pr-1"></i>
                                    Monroe Township, NJ 08831
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="candidate-list-favourite-time text-center">
                          <a
                            class="candidate-list-favourite order-2 text-danger"
                            href="#"
                          >
                            <i class="fas fa-heart"></i>
                          </a>
                          <span class="candidate-list-time order-1">
                            User
                          </span>
                        </td>
                        <td>
                          <ul class="list-unstyled mb-0 d-flex justify-content-end">
                            <li>
                              <a
                                href="#"
                                class="text-primary"
                                data-toggle="tooltip"
                                title=""
                                data-original-title="view"
                              >
                                <i class="far fa-eye"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                class="text-info"
                                data-toggle="tooltip"
                                title=""
                                data-original-title="Edit"
                              >
                                <i class="fas fa-pencil-alt"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                class="text-danger"
                                data-toggle="tooltip"
                                title=""
                                data-original-title="Delete"
                              >
                                <i class="far fa-trash-alt"></i>
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr class="candidates-list">
                        <td class="title">
                          <div class="thumb">
                            <img
                              class="img-fluid"
                              src="https://bootdey.com/img/Content/avatar/avatar2.png"
                              alt=""
                            />
                          </div>
                          <div class="candidate-list-details">
                            <div class="candidate-list-info">
                              <div class="candidate-list-title">
                                <h5 class="mb-0">
                                  <a href="#">Rafael Briggs</a>
                                </h5>
                              </div>
                              <div class="candidate-list-option">
                                <ul class="list-unstyled">
                                  <li>
                                    <i class="fas fa-filter pr-1"></i>
                                    Recruitment Consultancy
                                  </li>
                                  <li>
                                    <i class="fas fa-map-marker-alt pr-1"></i>
                                    Haines City, FL 33844
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="candidate-list-favourite-time text-center">
                          <a
                            class="candidate-list-favourite order-2 text-danger"
                            href="#"
                          >
                            <i class="fas fa-heart"></i>
                          </a>
                          <span class="candidate-list-time order-1">
                            User
                          </span>
                        </td>
                        <td>
                          <ul class="list-unstyled mb-0 d-flex justify-content-end">
                            <li>
                              <a
                                href="#"
                                class="text-primary"
                                data-toggle="tooltip"
                                title=""
                                data-original-title="view"
                              >
                                <i class="far fa-eye"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                class="text-info"
                                data-toggle="tooltip"
                                title=""
                                data-original-title="Edit"
                              >
                                <i class="fas fa-pencil-alt"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                class="text-danger"
                                data-toggle="tooltip"
                                title=""
                                data-original-title="Delete"
                              >
                                <i class="far fa-trash-alt"></i>
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr class="candidates-list">
                        <td class="title">
                          <div class="thumb">
                            <img
                              class="img-fluid"
                              src="https://bootdey.com/img/Content/avatar/avatar3.png"
                              alt=""
                            />
                          </div>
                          <div class="candidate-list-details">
                            <div class="candidate-list-info">
                              <div class="candidate-list-title">
                                <h5 class="mb-0">
                                  <a href="#">Vickie Meyer</a>
                                </h5>
                              </div>
                              <div class="candidate-list-option">
                                <ul class="list-unstyled">
                                  <li>
                                    <i class="fas fa-filter pr-1"></i>Human
                                    Resources
                                  </li>
                                  <li>
                                    <i class="fas fa-map-marker-alt pr-1"></i>
                                    Minneapolis, MN 55406
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="candidate-list-favourite-time text-center">
                          <a
                            class="candidate-list-favourite order-2 text-danger"
                            href="#"
                          >
                            <i class="fas fa-heart"></i>
                          </a>
                          <span class="candidate-list-time order-1">
                            Admin
                          </span>
                        </td>
                        <td>
                          <ul class="list-unstyled mb-0 d-flex justify-content-end">
                            <li>
                              <a
                                href="#"
                                class="text-primary"
                                data-toggle="tooltip"
                                title=""
                                data-original-title="view"
                              >
                                <i class="far fa-eye"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                class="text-info"
                                data-toggle="tooltip"
                                title=""
                                data-original-title="Edit"
                              >
                                <i class="fas fa-pencil-alt"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                class="text-danger"
                                data-toggle="tooltip"
                                title=""
                                data-original-title="Delete"
                              >
                                <i class="far fa-trash-alt"></i>
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr class="candidates-list">
                        <td class="title">
                          <div class="thumb">
                            <img
                              class="img-fluid"
                              src="https://bootdey.com/img/Content/avatar/avatar4.png"
                              alt=""
                            />
                          </div>
                          <div class="candidate-list-details">
                            <div class="candidate-list-info">
                              <div class="candidate-list-title">
                                <h5 class="mb-0">
                                  <a href="#">Nichole Haynes</a>
                                </h5>
                              </div>
                              <div class="candidate-list-option">
                                <ul class="list-unstyled">
                                  <li>
                                    <i class="fas fa-filter pr-1"></i>
                                    Information Technology
                                  </li>
                                  <li>
                                    <i class="fas fa-map-marker-alt pr-1"></i>
                                    Botchergate, Carlisle
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="candidate-list-favourite-time text-center">
                          <a
                            class="candidate-list-favourite order-2 text-danger"
                            href="#"
                          >
                            <i class="fas fa-heart"></i>
                          </a>
                          <span class="candidate-list-time order-1">
                            User
                          </span>
                        </td>
                        <td>
                          <ul class="list-unstyled mb-0 d-flex justify-content-end">
                            <li>
                              <a
                                href="#"
                                class="text-primary"
                                data-toggle="tooltip"
                                title=""
                                data-original-title="view"
                              >
                                <i class="far fa-eye"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                class="text-info"
                                data-toggle="tooltip"
                                title=""
                                data-original-title="Edit"
                              >
                                <i class="fas fa-pencil-alt"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                class="text-danger"
                                data-toggle="tooltip"
                                title=""
                                data-original-title="Delete"
                              >
                                <i class="far fa-trash-alt"></i>
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>
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
export default UserList;
