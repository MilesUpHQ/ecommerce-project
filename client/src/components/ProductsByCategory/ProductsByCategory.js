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
  const [minPrice, setMinPrice] = React.useState(null);
  const [maxPrice, setMaxPrice] = React.useState(null);
  const [range, setRange] = React.useState(null);
  const [prices, setPrices] = React.useState([]);
  const categoryId = useParams().category;
  // console.log("categoryId", categoryId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/products/category/${categoryId}`);
        let minPrice = Number.POSITIVE_INFINITY;
        let maxPrice = Number.NEGATIVE_INFINITY;
        for (let item of data) {
          if (item.price < minPrice) minPrice = item.price;
          if (item.price > maxPrice) maxPrice = item.price;
        }
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
        const closest = data.reduce((a, b) => {
          return Math.abs(b.price - 2500) < Math.abs(a.price - 2500) ? b : a;
        });
        setRange(closest.price);
        // prices.push(minPrice, closest.price, maxPrice)
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
        console.log(res);
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
          let minPrice = Number.POSITIVE_INFINITY;
          let maxPrice = Number.NEGATIVE_INFINITY;
          for (let item of res.data) {
            if (item.price < minPrice) minPrice = item.price;
            if (item.price > maxPrice) maxPrice = item.price;
          }
          setMinPrice(minPrice);
          setMaxPrice(maxPrice);
          const closest = res.data.reduce((a, b) => {
            return Math.abs(b.price - 2500) < Math.abs(a.price - 2500) ? b : a;
          });
          setRange(closest.price);
          setProducts(res.data);
          // setSearchItem([]);
        })
        .catch((err) => console.log(err));
    }
  }, [searchItem]);

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

    axios
      .get(
        `/filter-products/${categoryId}?prices_range=${JSON.stringify(prices)}`
      )
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar
        handleSearch={handleSearch}
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        options={options}
        placeholder={"Search for products"}
      />
      {/* <h1>Products By Category</h1> */}

      <br />
      <div className="row">
        <div className="col-4">
          <aside className="ml-2">
            <div className="card" style={{ display: "contents" }}>
              {/* <article className="card-group-item">
                <header className="card-header">
                  <h6 className="title">Filters</h6>
                </header>
                <div className="filter-content">
                  <div className="card-body">
                    <label style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="radio"
                        value="small"
                        style={{
                          width: "1rem",
                          height: "1rem",
                          marginRight: "0.3rem",
                        }}
                      />
                      Men
                    </label>
                    <label style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="radio"
                        value="small"
                        style={{
                          width: "1rem",
                          height: "1rem",
                          marginRight: "0.3rem",
                        }}
                      />
                      Women
                    </label>
                    <label style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="radio"
                        value="small"
                        style={{
                          width: "1rem",
                          height: "1rem",
                          marginRight: "0.3rem",
                        }}
                      />
                      Kids
                    </label>
                  </div>
                </div>
              </article> */}
              <article className="card-group-item">
                <header className="card-header">
                  <h6 className="title">Price Filter</h6>
                </header>
                <div class="filter-content">
                  <div class="card-body">
                    <div class="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="Check1"
                        // value={`${minPrice} - ${range}`}
                        // onChange={(e) =>
                        //   e.target.checked
                        //     ? handlePrice(e, minPrice, range)
                        //     : (prices.pop(minPrice), prices.pop(range))
                        // }
                        onChange={(e) => handlePrice(e, minPrice, range)}
                      />
                      <label class="custom-control-label" for="Check1">
                        {minPrice} - {range}
                      </label>
                    </div>

                    <div class="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="Check2"
                        // onChange={(e) =>
                        //   e.target.checked
                        //     ? handlePrice(range, maxPrice)
                        //     : (prices.pop(range), prices.pop(maxPrice))
                        // }
                        onChange={(e) => handlePrice(e, range, maxPrice)}
                      />
                      <label class="custom-control-label" for="Check2">
                        {range} - {maxPrice}
                      </label>
                    </div>

                    {/* <div class="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="Check3"
                      />
                      <label class="custom-control-label" for="Check3">
                        5000 & above
                      </label>
                    </div> */}
                  </div>
                </div>
              </article>
            </div>
          </aside>
        </div>
        <div className="col-8">
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
