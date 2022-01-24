import React, { useState } from "react";
import AddCategory from "./AddCategory";
import axios from "../../../utils/ajax-helper";
import "../css/pagination.css";
import Pagination from "./Pagination";
import ErrorAlert from "./ErrorAlert";

const CategoryList = ({
  categories,
  currPage,
  lastPage,
  totalPages,
  handlePagination,
  setCategories,
  setCurrPage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [input, setInput] = useState("");
  const [parentCategory, setParentCategory] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleOpen = (id) => {
    setEditId(id);
    setIsOpen(true);
  };

  const handleUpdateCategory = (category) => {
    if (input == "") {
      return;
    }
    let id =
      parentCategory.length !== 0
        ? parentCategory[0].value
        : category.parent_id;

    let page = currPage || 1;

    axios
      .post("/update-category", {
        categoryName: input,
        categoryId: category.id,
        parentCategoryId: id,
      })
      .then((res) => {
        setEditId(null);
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
        setErrorMsg(
          "Sorry! You can't update category currently. Please Try again"
        );
      });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure! Delete ${name} Category?`)) {
    let page = currPage || 1;
    axios
      .post("/delete-category", {
        id,
      })
      .then((res) => {
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
        setErrorMsg("Sorry! You can't delete some other's Parent Category");
      });
    }
  };

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
                    <th>Category</th>
                    <th>Parent Category</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {categories &&
                    categories.map((category) => (
                      <React.Fragment key={category.id}>
                        {category.id !== editId ? (
                          <tr key={category.id}>
                            <td>{category.category}</td>
                            <td>{category.parent_category}</td>
                            <td>
                              <button
                                className="btn btn-info mr-4"
                                onClick={() => handleOpen(category.id)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(category.id, category.category)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ) : (
                          <AddCategory
                            category={category}
                            handleFunction={() =>
                              handleUpdateCategory(category)
                            }
                            input={input}
                            parentCategory={parentCategory}
                            setParentCategory={setParentCategory}
                            setInput={setInput}
                          />
                        )}
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

export default CategoryList;
