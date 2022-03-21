import React from "react";
import { FaHeart } from "react-icons/fa";

export default function SimpleNavBar() {
  return (
    <>
      <nav
        className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row"
        style={{ position: "sticky" }}
      >
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
          <ul className="navbar-nav mr-lg-2">
            <li className="nav-item nav-search d-none d-lg-block">
              <a className="nav-link" href="/">
                <h4>Home</h4>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-profile dropdown">
              <a href="#">
                <FaHeart className="navBarIcon" />
              </a>
            </li>
            <li className="nav-item ">
              <a href="/logout" style={{ color: "black" }}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
