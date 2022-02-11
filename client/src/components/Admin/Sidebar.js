import React from "react";
import "./css/admin-style.css";

const Sidebar = () => {
  return (
    <React.Fragment>
      {/* <Helmet>
        <link rel="stylesheet" href="/css/style.css" />
      </Helmet> */}
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" href="/admin/products">
              <i className="icon-grid menu-icon"></i>
              <span className="menu-title">Products</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/admin/add_products">
              <i className="icon-grid menu-icon"></i>
              <span className="menu-title">Add Products</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/admin/product/featured">
              <i className="icon-grid menu-icon"></i>
              <span className="menu-title"> Featured Products</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/admin/categories">
              <i className="icon-grid menu-icon"></i>
              <span className="menu-title">Categories</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#"
              aria-expanded="false"
              aria-controls="form-elements"
            >
              <i className="icon-columns menu-icon"></i>
              <span className="menu-title">Form elements</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="form-elements">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="pages/forms/basic_elements.html"
                  >
                    Basic Elements
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Sidebar;
