import React, { useEffect, useState } from "react";
import CategoryList from "./CategoryList";
import AddCategory from "./AddCategory";
import axios from "../../../utils/ajax-helper";
import ErrorAlert from "./ErrorAlert";

const Category = () => {
  const [input, setInput] = useState("");
  const [categories, setCategories] = useState(null);
  const [parentCategory, setParentCategory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currPage, setCurrPage] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleAddCategory = () => {
    if (input.length < 3) {
      return;
    }
    let id = parentCategory.length !== 0 ? parentCategory[0].value : 0;
    let page = currPage || 1;
    axios
      .post("/category", {
        categoryName: input,
        parentCategoryId: id,
      })
      .then((res) => {
        setIsOpen(false);
        axios
          .get(`/categories?page=${page}`)
          .then((res) => {
            setCurrPage(res.data.currPage);
            setCategories(res.data.categories);
          })
          .catch((err) => {
            setErrorMsg("Sorry! Something went wrong. Please Try again");
          });
      })
      .catch((err) => {
        console.log(err) //setErrorMsg("Sorry! You can't add Category currently. Please Try again");
      });
  };

  const handlePagination = (page) => {
    axios
      .get(`/categories?page=${page}`)
      .then((res) => {
        setCategories(res.data.categories);
        setCurrPage(res.data.currPage);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again");
      });
  };

  useEffect(() => {
    axios
      .get("/categories")
      .then((res) => {
        setCurrPage(res.data.currPage);
        setLastPage(res.data.lastPage);
        setTotalPages(res.data.totalPages);
        setCategories(res.data.categories);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again");
      });
  }, []);

  return (
    <React.Fragment>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "1%",
                alignItems: "center",
              }}
            >
              <h1>Categories</h1>
              <button
                type="button"
                className="btn btn-primary btn-icon-text"
                style={{ height: "fit-content" }}
                onClick={() => setIsOpen(true)}
              >
                Add Category
              </button>
            </div>
            {isOpen && (
              <form className="forms-sample">
                <div className="form-group">
                  <table className="table table-hover">
                    <tbody>
                      <AddCategory
                        input={input}
                        setInput={setInput}
                        handleFunction={handleAddCategory}
                        parentCategory={parentCategory}
                        setParentCategory={setParentCategory}
                      />
                    </tbody>
                  </table>
                </div>
              </form>
            )}
            {errorMsg && <ErrorAlert msg={errorMsg} />}
            <CategoryList
              categories={categories}
              currPage={currPage}
              lastPage={lastPage}
              totalPages={totalPages}
              handlePagination={handlePagination}
              setCategories={setCategories}
              setCurrPage={setCurrPage}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Category;
