import React, { useEffect, useState } from "react";
import CategoryList from "./CategoryList";
import AddCategory from "./AddCategory";
import axios from "../../../utils/ajax-helper";

const Category = () => {
  const [input, setInput] = useState("");
  const [categories, setCategories] = useState(null);
  const [parentCategory, setParentCategory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddCategory = () => {
    if (input.length < 3) {
      return;
    }

    let id = parentCategory.length !== 0 ? parentCategory[0].value : 0;

    axios
      .post("/category", {
        categoryName: input,
        parentCategoryId: id,
      })
      .then((res) => {
        setIsOpen(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
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
            <CategoryList categories={categories} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Category;
