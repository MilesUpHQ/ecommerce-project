import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../utils/ajax-helper";
import ErrorMessages from "./ErrorMessages";
import toast, { Toaster } from "react-hot-toast";
import "../../Common/css/admin-style.css";

const AddForm = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    size: "",
    color: "",
    type: "",
    price: "",
    description: "",
  });
  const [categories, setCategories] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [errormsg, setErrormsg] = useState(null);
  const [categoryid, setCategory] = useState("");
  const [isEnable, setIsEnable] = useState(true);

  //sending data after usestate dec part
  const submitHandler = async (e) => {
    e.preventDefault();
    const imageData = new FormData();
    imageData.append("file", fileData);
    imageData.append("name", details.name);
    imageData.append("price", details.price);
    imageData.append("description", details.description);
    imageData.append("size", details.size);
    imageData.append("color", details.color);
    imageData.append("type", details.type);
    imageData.append("category", categoryid);

    if (Object.keys(details).length == 0) {
      setErrormsg("Please Fill The Form First");
      return;
    }
    if (!Object.keys(details).includes("name") || details.name === "") {
      setErrormsg("Name cannot be empty");
      return;
    } else if (fileData.length == 0) {
      setErrormsg("Please select an image");
      return;
    } else if (categoryid === "") {
      setErrormsg("Category cannot be empty");
      return;
    } else if (
      !Object.keys(details).includes("price") ||
      details.price === ""
    ) {
      setErrormsg("Price cannot be empty");
      return;
    } else if (
      !Object.keys(details).includes("description") ||
      details.description === ""
    ) {
      setErrormsg("Description cannot be empty");
      return;
    }

    axios
      .post("/admin/products/add", imageData)
      .then((res) => {
        setIsEnable(false);
        toast.success("Product Created Sucessfully!");
        setTimeout(() => {
          navigate("/admin/products");
        }, 1500);
      })
      .catch((err) => {
        setErrormsg("Oopise! Something went wrong please try again.");
      });
  };

  useEffect(() => {
    axios
      .get("/admin/products/add")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        setErrormsg("Oopps! Something went wrong. Please Try again", err);
      });
  }, []);

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
  };

  return (
    <div className="main-panel">
      <Toaster />
      <div className="content-wrapper">
        <div className="row">
          {errormsg && <ErrorMessages msg={errormsg} />}

          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Add Products</h4>
                <p className="card-description">Enter product details</p>

                <form className="forms-sample" onSubmit={submitHandler}>
                  <div className="form-group-name">
                    <label htmlFor="exampleInputName1">Name*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      placeholder="Name"
                      value={details.name}
                      onChange={(e) =>
                        setDetails({ ...details, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group-img ">
                    <label htmlFor="imageupload">Upload image*</label>
                    <br />
                    <input
                      type="file"
                      name="image"
                      onChange={fileChangeHandler}
                    />
                  </div>
                  <div className="form-group ">
                    <label htmlFor="exampleFormControlSelect3">
                      Select Size
                    </label>
                    <select
                      className="form-control form-control-sm"
                      id="exampleFormControlSelect3"
                      onChange={(e) =>
                        setDetails({ ...details, size: e.target.value })
                      }
                    >
                      <option value="0">Select product size</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="Color">Color</label>
                    <input
                      type="text"
                      className="form-control"
                      id="color"
                      placeholder="make it vibrant"
                      value={details.color}
                      onChange={(e) =>
                        setDetails({ ...details, color: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group-cat">
                    <label htmlFor="Category">Category*</label>
                    <select
                      value={categoryid}
                      className="form-control form-control-sm"
                      name="Category"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="0">Select From The Following</option>
                      {categories.map((Category) => {
                        return (
                          <option value={Category.id} key={Category.id}>
                            {Category.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="form-group mt-3">
                    <label htmlFor="Type">Type</label>
                    <input
                      type="text"
                      className="form-control"
                      id="type"
                      placeholder="List the type of your product"
                      value={details.type}
                      onChange={(e) =>
                        setDetails({ ...details, type: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group-pr">
                    <label htmlFor="exampleInputPrice1">Price*</label>
                    <input
                      type="integer"
                      className="form-control"
                      id="exampleInputPrice1"
                      placeholder="0"
                      value={details.price}
                      onChange={(e) =>
                        setDetails({ ...details, price: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="exampleTextarea1">Description*</label>
                    <textarea
                      className="form-control"
                      id="exampleTextarea1"
                      placeholder="Describe your product within 100 words"
                      rows="4"
                      maxLength="100"
                      value={details.description}
                      onChange={(e) =>
                        setDetails({ ...details, description: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className={
                      "btn btn-primary mr-2 " + `${isEnable ? "" : "disabled"}`
                    }
                  >
                    Submit
                  </button>
                  <button className="btn btn-light"  onClick={() => navigate("/admin/products")}>Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
