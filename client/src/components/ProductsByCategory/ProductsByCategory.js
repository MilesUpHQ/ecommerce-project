// display products by category with get id from params
import axios from "../../utils/ajax-helper";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductsByCategory.css";
import Navbar from "../Navbar/Navbar";
export default function ProductsByCategory() {
  const [products, setProducts] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [searchItem, setSearchItem] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const categoryId = useParams().category;
  console.log("categoryId", categoryId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/products/category/${categoryId}`);
        setProducts(data);
      } catch (error) {
        setErrorMsg("Sorry! Something went wrong. Please Try again", error);
      }
    };
    fetchData();
  }, [categoryId]);

  const handleSearch = (value) => {
    axios
      .get(`/typeahead-items?search_keyword=${value}`)
      .then((res) => {
        console.log(res)
        let array = res.data.map(({ id, name }) => ({
          label: name,
          value: id,
        }));
        setOptions(array);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (searchItem.length > 0) {
      axios
        .get(`/products-by-search?search_keyword=${searchItem[0].label}`)
        .then((res) => {
          setProducts(res.data);
          setSearchItem([])
        })
        .catch((err) => console.log(err));
    }
  }, [searchItem]);

  return (
    <>
      <Navbar
        handleSearch={handleSearch}
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        options={options}
        placeholder={'Search for products'}
      />
      <div>
        <h1>Products By Category</h1>
        <div className="row">
          {errorMsg ? (
            <div className="alert alert-danger">{errorMsg}</div>
          ) : (
            <></>
          )}
          {products.length > 0
            ? products.map((product) => (
                <div className="col-md-4" key={product.id}>
                  <div className="card mb-4 shadow-sm card-width">
                    <img
                      src={product.image_url}
                      className="card-img-top card-img"
                      alt="product"
                    />
                    <div className="card-body">
                      <p className="card-text">{product.name}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="text-muted">${product.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}
