import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/ajax-helper";
import ErrorMessages from "./ErrorMessages";
import Pagination from "../../Common/Pagination";
import "../../Common/css/admin-style.css";
import "../../Common/css/pagination.css";

const UserList = ({}) => {
  const [display, setdisplay] = useState([]);
  const [Errormsg, setErrormsg] = useState(null);
  const [currPage, setCurrPage] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  useEffect(() => {
    axios
      .get("/admin/userData")
      .then((res) => {
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
      .get(`/admin/userData?page=${page}`)
      .then((res) => {
        setdisplay(res.data.products);
        setCurrPage(res.data.currPage);
      })
      .catch((err) => {
        setErrormsg("Sorry! Something went wrong. Please Try again");
      });
  };

  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure! You want to delete ${name} ?`)) {
      axios
        .delete("/delete_user", { params: { id } })
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
        <div className="container mt-3 mb-4 ">
          <div className="col-lg-9 mt-4 mt-lg-0 w-100">
            <div className="row">
              <div className="col-md-12 ">
                <div className="user-dashboard-info-box table-responsive mb-0 bg-white w-1000 p-4 shadow-smm">
                <h1>Users</h1>
                  <table className="table manage-candidates-top mb-0">
                    <thead>
                      <tr>
                        <th>Candidate Name</th>
                        <th className="text-center">Status</th>
                        <th className="action text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {display.map((display) => (
                        <tr className="candidates-list" key={display.id}>
                          <td className="title">
                            <div className="thumb">
                              <img
                                className="img-fluid"
                                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                alt=""
                              />
                            </div>
                            <div className="candidate-list-details">
                              <div className="candidate-list-info">
                                <div className="candidate-list-title">
                                  <h5 className="mb-0">
                                    <a href={`/admin/user/${display.id}/view`}>{display.first_name}</a>
                                  </h5>
                                </div>
                                <div className="candidate-list-option">
                                  <ul className="list-unstyled">
                                    <li>
                                      <i className="fas fa-filter pr-1"></i>
                                      {display.username}
                                    </li>
                                    <li>
                                      <i className="fas fa-map-marker-alt pr-1"></i>
                                      {display.email}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="candidate-list-favourite-time text-center">
                            <a
                              className="candidate-list-favourite order-2 text-danger"
                              href="#"
                            >
                              <i className="fas fa-heart"></i>
                            </a>
                            <span className="candidate-list-time order-1">
                              Admin
                            </span>
                          </td>
                          <td>
                            <ul className="list-unstyled mb-0 d-flex justify-content-end">
                              <li>
                                <a
                                  href={`/admin/user/${display.id}/view`}
                                  className="text-primary"
                                  data-toggle="tooltip"
                                  title=""
                                  data-original-title="view"
                                >
                                  <i className="far fa-eye mr-2"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  onClick={() =>
                                    deleteUser(display.id, display.first_name)
                                  }
                                  className="text-danger"
                                  data-toggle="tooltip"
                                  title=""
                                  data-original-title="Delete"
                                >
                                  <i className="far fa-trash-alt"></i>
                                </a>
                              </li>
                            </ul>
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
export default UserList;
