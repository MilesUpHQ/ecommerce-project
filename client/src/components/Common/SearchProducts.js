import axios from "../../utils/ajax-helper";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Add from "../Cart/Add";
import ProductsCatalog from "../ProductsCatalog/ProductsCatalog";

export default function SearchProducts({ searchItem, searchInput }) {
  const [products, setProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [minPrice, setMinPrice] = React.useState(null);
  const [maxPrice, setMaxPrice] = React.useState(null);
  const [range, setRange] = React.useState(null);
  const [secondRange, setSecondRange] = React.useState(null);
  const [prices, setPrices] = React.useState([]);
  const [filterCategories, setFilterCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState(null);
  const [addToCart, setAddToCart] = React.useState(false);
  const [updateNavbar, setUpdateNavbar] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false)

  useEffect(() => {
    if (searchInput !== null) {
      getProductsBySearch(searchInput);
    }
    if (searchItem.length > 0) {
      getProductsBySearch(searchItem[0].label);
    }
  }, [searchItem, searchInput]);

  const handleAddToCart = (id) => {
    setAddToCart(id);
    setUpdateNavbar(true);
    setTimeout(() => {
      setAddToCart(false);
      setUpdateNavbar(false);
    }, 2000);
  };

  const getPriceRanges = (data) => {
    let minPrice = Number.POSITIVE_INFINITY;
    let maxPrice = Number.NEGATIVE_INFINITY;
    for (let item of data) {
      if (item.price < minPrice) minPrice = item.price;
      if (item.price > maxPrice) maxPrice = item.price;
    }
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    const firstRange = data.reduce((a, b) => {
      return Math.abs(b.price - 2500) < Math.abs(a.price - 2500)
        ? b.price <= 2500
          ? b
          : a
        : a.price <= 2500
        ? a
        : b;
    });
    const secondRange = data.reduce((a, b) => {
      return Math.abs(b.price - 5000) < Math.abs(a.price - 5000)
        ? b.price <= 5000
          ? b
          : a
        : a.price <= 5000
        ? a
        : b;
    });
    setRange(firstRange.price);
    setSecondRange(secondRange.price);
  };

  const searchFunction = async (value, keyword) => {
    const products = await axios.get(
      `/search/products?category_id=${value}&&keyword=${keyword}`
    );
    return products;
  };

  const getProductsBySearch = (searchVal) => {
    setIsLoading(true)
    setSearchValue(searchVal);
    searchFunction("", searchVal)
      .then((res) => {
        if (res.data.row.length > 0) {
          setProducts(res.data.row);
          setFilteredProducts(res.data.row);
          setSelectedCategory(null);
          let filterCategories = [];
          for (let item of res.data.row) {
            filterCategories.push({
              id: item.category_id,
              name: item.category,
            });
          }
          let result = filterCategories.reduce((unique, item) => {
            if (
              !unique.some(
                (obj) => obj.id === item.id && obj.name === item.name
              )
            ) {
              unique.push(item);
            }
            return unique;
          }, []);
          getPriceRanges(res.data.row);
          setFilterCategories(result);
          setIsLoading(false)
        } else {
          setProducts(res.data.row);
          setFilteredProducts(res.data.row);
          setIsLoading(false)
        }
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again", err);
      });
  };

  const handlePrice = (e, min, max) => {
    if (e.target.checked) {
      prices.push(min);
      prices.push(max);
    } else {
      let indexOne = prices.indexOf(min);
      prices.splice(indexOne, 1);
      let indexTwo = prices.indexOf(max);
      prices.splice(indexTwo, 1);
    }

    let priceFilteredProducts = [];
    if (prices.length > 0) {
      for (let item of products) {
        if (
          item.price >= Math.min(...prices) &&
          item.price <= Math.max(...prices)
        ) {
          priceFilteredProducts.push(item);
        }
      }
      setFilteredProducts(priceFilteredProducts);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleCategoryFilter = (e) => {
    setSelectedCategory(e.target.value);
    searchFunction(e.target.value, searchValue)
      .then((res) => {
        setProducts(res.data.row);
        getPriceRanges(res.data.row);
        setFilteredProducts(res.data.row);
        document
          .querySelectorAll("input[type=checkbox]")
          .forEach((el) => (el.checked = false));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {addToCart ? <Add id={addToCart} /> : null}
      <div className="row">
        {errorMsg ? (
          <div className="alert alert-danger">{errorMsg}</div>
        ) : (
          <></>
        )}

        <div className="col-3" style={{ marginTop: "7%" }}>
          <aside className="ml-2">
            <div className="card" style={{ display: "contents" }}>
              {filteredProducts.length >= 1 ? (
                <article className="card-group-item">
                  <header className="card-header">
                    <h6 className="title">Category Filters</h6>
                  </header>
                  <div className="filter-content">
                    <div className="card-body">
                      {filterCategories &&
                        filterCategories.map((filterCategory) => (
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                            key={filterCategory.id}
                          >
                            <input
                              type="radio"
                              value={filterCategory.id}
                              style={{
                                width: "1rem",
                                height: "1rem",
                                marginRight: "0.3rem",
                              }}
                              checked={selectedCategory == filterCategory.id}
                              onChange={(e) => handleCategoryFilter(e)}
                            />
                            {filterCategory.name}
                          </label>
                        ))}
                    </div>
                  </div>
                </article>
              ) : (
                ""
              )}
              {filteredProducts.length > 1 && minPrice !== secondRange && (
                <article className="card-group-item">
                  <header className="card-header">
                    <h6 className="title">Price Filter</h6>
                  </header>
                  <div className="filter-content">
                    <div className="card-body">
                      {minPrice !== range ? (
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="Check1"
                            onChange={(e) => handlePrice(e, minPrice, range)}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="Check1"
                            style={{ paddingTop: "3px" }}
                          >
                            {minPrice} - {range}
                          </label>
                        </div>
                      ) : (
                        ""
                      )}

                      {range !== secondRange ? (
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="Check2"
                            onChange={(e) => handlePrice(e, range, secondRange)}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="Check2"
                            style={{ paddingTop: "3px" }}
                          >
                            {range} - {secondRange}
                          </label>
                        </div>
                      ) : (
                        " "
                      )}

                      {maxPrice > 5000 && (
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="Check3"
                            onChange={(e) => handlePrice(e, 5000, maxPrice)}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="Check3"
                            style={{ paddingTop: "3px" }}
                          >
                            5000 & above
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              )}
            </div>
          </aside>
        </div>

        <div className={filteredProducts.length > 0 ? 'col-9': ''}>
          <ProductsCatalog
            products={filteredProducts}
            handleAddToCart={handleAddToCart}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}
