import React, { useEffect, useState } from "react";
// import "./pagination-style.css";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import axios from "../../utils/ajax-helper";
import TypeAhead from "../Admin/Categories/TypeAhead";
import { getJWT } from "../../utils/jwt";
const Navbar = ({
  // handleSearch,
  setSearchItem,
  searchItem,
  // options,
  placeholder,
  setSearchInput,
  searchInput,
  handleSearchFilter,
  updateNavbar,
}) => {
  // get categories from server and store in state and update in navbar
  // /categories
  const [categories, setCategories] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [cartPrice, setCartPrice] = React.useState(0);
  const [cartItems, setCartItems] = React.useState(0);
  const [options, setOptions] = React.useState([]);

  const updateCartDetails = () => {
    axios
      .get("/cart", {
        headers: {
          Authorization: `Bearer ${getJWT()}`,
        },
      })
      .then((res) => {
        setCartItems(res.data.length);
        setCartPrice(res.data[0]?.total);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again " + err);
      });
  };

  const handleSearch = (value) => {
    axios
      .get(`/typeahead-items?search_keyword=${value}`)
      .then((res) => {
        let array = res.data.map(({ id, name }) => ({
          label: name,
          value: id,
        }));
        setOptions(array);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("/categories_list")
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again");
      });
  }, []);

  useEffect(() => {
    updateCartDetails();
  }, [updateNavbar]);

  return (
    <>
      <nav
        className="navbar navbar-expand-md col-lg-12 col-12 p-0 fixed-top d-flex flex-row"
        style={{ position: "sticky" }}
      >
        <div className="navbar-menu-wrapper d-flex justify-content-end">
          <ul className="navbar-nav ty">
            <li className="nav-item nav-search d-none d-lg-block">
              <a className="nav-link" href="/">
                <h4>Products</h4>
              </a>
            </li>
            {categories.map((parent_category) => (
              <>
                {parent_category.sub_categories.length > 0 ? (
                  <div className="dropdown" key={parent_category.id}>
                    <button
                      className="btn dropdown-toggle"
                      id={"dropdownMenu" + parent_category.id}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {parent_category.name}
                    </button>

                    <div
                      className="dropdown-menu"
                      aria-labelledby={"dropdownMenu" + parent_category.id}
                    >
                      <li>
                        <a
                          className="dropdown-item"
                          href={"/products/" + parent_category.id}
                        >
                          {parent_category.name}
                        </a>
                      </li>
                      {parent_category.sub_categories.map((sub_category) => (
                        <li>
                          <a
                            className="dropdown-item"
                            href={"/products/" + sub_category.id}
                          >
                            {sub_category.name}
                          </a>
                        </li>
                      ))}
                    </div>
                  </div>
                ) : (
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href={"/products/" + parent_category.id}
                    >
                      {parent_category.name}
                    </a>
                  </li>
                )}
              </>
            ))}

            <li className="nav-item nav-search d-none d-lg-block">
              <TypeAhead
                setSearchItem={setSearchItem}
                searchItem={searchItem}
                handleSearch={handleSearch}
                options={options}
                placeholder={placeholder}
                setSearchInput={setSearchInput}
                searchInput={searchInput}
                handleSearchFilter={handleSearchFilter}
                onEnterSearchItems={true}
              />
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-profile dropdown">
              <a href="#">
                <FaHeart className="navBarIcon" />
              </a>
            </li>
            <li className="nav-item nav-profile dropdown">
              <a href="/cart">
                <FaShoppingCart className="navBarIcon" />({cartItems}) ${""}
                {cartPrice}
              </a>
            </li>
            <li className="nav-item ">
              <a href="/logout">Logout</a>
            </li>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            data-toggle="offcanvas"
          >
            Products
          </button>
        </div>
      </nav>
      <style>{`
        .rbt-input-main {
          padding: 0 5rem 0 5px;
        }
      `}</style>
    </>
  );
};

export default Navbar;
