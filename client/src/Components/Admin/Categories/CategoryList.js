import React, { useState } from "react";
import AddCategory from "./AddCategory";
import axios from "../../utils/ajax-helper";

const CategoryList = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [input, setInput] = useState("");
  const [parentCategory, setParentCategory] = useState([]);

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

    axios
      .post("/update-category", {
        categoryName: input,
        categoryId: category.id,
        parentCategoryId: id,
      })
      .then((res) => {
        setEditId(null);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .post("/delete-category", {
        id,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
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
                                onClick={() => handleDelete(category.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ) : (
                          <AddCategory
                            category={category}
                            handleFunction={() => handleUpdateCategory(category)}
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
    </>
  );
};

export default CategoryList;
