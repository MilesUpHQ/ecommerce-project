import React, { useState } from "react";
import "../FeaturedProducts/pagination-style.css";
import Pagination from "../FeaturedProducts/Pagination";
import ErrorAlert from "../FeaturedProducts/ErrorAlert";

const GetFeaturedProducts = ({
  featuredProducts,
  currPage,
  lastPage,
  totalPages,
  handlePagination,
  setCurrPage,
}) => {
  const [errorMsg, setErrorMsg] = useState(null);

  return (
    <>
      {errorMsg && <ErrorAlert msg={errorMsg} />}
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Featured Products</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {featuredProducts &&
                    featuredProducts.map((featuredProduct) => (
                      <React.Fragment key={featuredProduct.id}>
                        <tr key={featuredProduct.id}>
                          <td>{featuredProduct.name}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        currPage={currPage}
        lastPage={lastPage}
        totalPages={totalPages}
        handlePagination={handlePagination}
      />
    </>
  );
};

export default GetFeaturedProducts;
