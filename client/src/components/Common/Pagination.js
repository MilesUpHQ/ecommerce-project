import React, { useEffect, useState } from "react";

const Pagination = ({ currPage, lastPage, totalPages, handlePagination }) => {
  const [showPages, setShowPages] = useState(null);

  useEffect(() => {
    pageRange(currPage, totalPages);
  }, [currPage, totalPages]);

  const pageRange = (page, pageCount) => {
    let startPage = page - 2,
      lastPage = page + 2;

    if (lastPage > pageCount) {
      startPage -= lastPage - pageCount;
      lastPage = pageCount;
    }
    if (startPage <= 0) {
      lastPage += (startPage - 1) * -1;
      startPage = 1;
    }

    lastPage = lastPage > pageCount ? pageCount : lastPage;
    let pages = [];
    for (let i = startPage; i <= lastPage; i++) {
      if (i <= totalPages.length) pages.push(i);
    }
    setShowPages(pages);
  };

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li
            className={currPage == 1 ? "page-item disabled" : "page-item"}
            onClick={() => handlePagination(currPage - 1)}
          >
            <div className="page-link" href="#" tabIndex="-1">
              Previous
            </div>
          </li>
          {showPages &&
            showPages.map((page) => (
              <React.Fragment key={page}>
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
              </React.Fragment>
            ))}
          <li
            className={
              currPage == lastPage ? "page-item disabled" : "page-item"
            }
            onClick={() =>
              currPage !== lastPage ? handlePagination(currPage + 1) : ""
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
