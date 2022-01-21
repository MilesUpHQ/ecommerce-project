import React from "react";

const Pagination = ({ currPage, lastPage, totalPages, handlePagination }) => {
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={currPage == 1 ? "page-item disabled" : "page-item"}>
            <div className="page-link" href="#" tabindex="-1">
              Previous
            </div>
          </li>
          {totalPages &&
            totalPages.map((page) => (
              <>
                <li className="page-item">
                  <div
                    className={
                      currPage == page
                        ? "page-link page-link-active"
                        : "page-link"
                    }
                    onClick={() => handlePagination(page)}
                  >
                    {page}
                  </div>
                </li>
              </>
            ))}
          <li
            className={
              currPage == lastPage ? "page-item disabled" : "page-item"
            }
          >
            <div className="page-link">Next</div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
