// display products by category with get id from params
import axios from "../../utils/ajax-helper";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import Add from "../Cart/Add";
import ProductsCatalog from "../ProductsCatalog/ProductsCatalog";
import { Container } from "react-bootstrap";
import SearchProducts from "../Common/SearchProducts";
import AddToWishList from "../WishList/AddToWishList";
export default function ProductsByCategory() {
  const [products, setProducts] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [searchItem, setSearchItem] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState(null);
  const categoryId = useParams().category;
  const [addToCart, setAddToCart] = React.useState(false);
  const [updateNavbar, setUpdateNavbar] = React.useState(false);
  const [addToWishList, setAddToWishList] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/products/category/${categoryId}`);
        setProducts(data);
        setIsLoading(false)
      } catch (error) {
        // setErrorMsg("Sorry! Something went wrong. Please Try again", error);
        setIsLoading(false)
      }
    };
    fetchData();
  }, [categoryId]);
  

  const handleAddToCart = (id) => {
    setAddToCart(id);
    setUpdateNavbar(true);
    setTimeout(() => {
      setAddToCart(false);
      setUpdateNavbar(false);
    }, 2000);
  };
  const handleAddToWishList = (id) => {
    setAddToWishList(id);
    setTimeout(() => {
      setAddToWishList(false);
    }, 2000);
  };

  const handleSearchFilter = (value) => {
    setSearchInput(value);
  };

  return (
    <>
      {addToCart ? <Add id={addToCart} /> : null}
      {addToWishList ? <AddToWishList id={addToWishList} /> : null}
      <Navbar
        handleSearchFilter={handleSearchFilter}
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        placeholder={"Search for products"}
        updateNavbar={updateNavbar}
      />

      <br />
      {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : <></>}

      <div>
        {searchItem.length > 0 || searchInput !== null ? (
          <SearchProducts searchItem={searchItem} searchInput={searchInput} />
        ) : (
          <Container>
            <div className="row">
              {errorMsg ? (
                <div className="alert alert-danger">{errorMsg}</div>
              ) : (
                <></>
              )}
              <ProductsCatalog
                title={"Products By Category"}
                products={products}
                searchItem={searchItem}
                searchInput={searchInput}
                handleAddToCart={handleAddToCart}
                handleAddToWishList={handleAddToWishList}
                isLoading={isLoading}
              />
            </div>
          </Container>
        )}
      </div>
    </>
  );
}
