import React from "react";
import SearchProducts from "../Common/SearchProducts";
import ProductsList from "./ProductsList";

export default function ProductsCatalog(props) {
  return (
    <>
      <section class="section-products">
        <div class="container">
          <div class="row justify-content-center text-center">
            <div class="col-md-8 col-lg-6">
              <div class="header">
                <h3>{props.title}</h3>
                <h2>Popular Products</h2>
              </div>
            </div>
          </div>
          <div class="row">
            {props.searchItem.length > 0 || props.searchInput !== null ? (
              <SearchProducts
                searchItem={props.searchItem}
                searchInput={props.searchInput}
              />
            ) : (
              <ProductsList products={props.products} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
