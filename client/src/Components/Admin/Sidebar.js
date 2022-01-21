import React from "react";

const Sidebar = () => {
  return (
    <React.Fragment>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="icon-grid menu-icon"></i>
              <span className="menu-title">Dashboard</span>
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
