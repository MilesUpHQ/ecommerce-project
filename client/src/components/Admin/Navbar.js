import React from "react";
import "../Common/css/admin-style.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div
          className="navbar-menu-wrapper d-flex align-items-center justify-content-end"
          style={{ width: "100%" }}
        >
          <ul className="navbar-nav mr-lg-2">
            <li className="nav-item nav-search d-none d-lg-block">
              <div className="input-group">
                <div
                  className="input-group-prepend hover-cursor"
                  id="navbar-search-icon"
                >
                  <span className="input-group-text" id="search">
                    <i className="icon-search"></i>
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-profile dropdown">
              <a href="/">Home</a>
            </li>
            <li className="nav-item nav-profile dropdown">
              <a href="/logout">Logout</a>
            </li>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            data-toggle="offcanvas"
          >
            <span className="icon-menu"></span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
