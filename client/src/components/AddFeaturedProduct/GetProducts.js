import React from "react";
import "../FeaturedProducts/pagination-style.css";
import Pagination from "../FeaturedProducts/Pagination";

const GetProducts = ({
  products,
  currPage,
  lastPage,
  totalPages,
  handlePagination,
}) => {
  return (
    <>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Select products to add to featured products </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((product) => (
                      <React.Fragment key={product.id}>
                        <tr key={product.id}>
                          <td>{product.name}</td>
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

export default GetProducts;
