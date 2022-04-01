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
    type: "",
    description: "",
  });
  const [categories, setCategories] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [errormsg, setErrormsg] = useState(null);
  const [categoryid, setCategory] = useState("");
  const [isEnable, setIsEnable] = useState(true);

  const submitHandler = async (e) => {
    e.preventDefault();
    const imageData = {
      name: details.name,
      description: details.description,
      category: categoryid,
    };

    axios
      .post("/admin/products/add", imageData)
      .then((res) => {
        setIsEnable(false);
        toast.success("Product Created Sucessfully!");
        setTimeout(() => {
          navigate(`/admin/product/${res.data.id}/add/variant`);
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
                  <button className="btn btn-primary ml-3" type="submit">
                    Add Variant
                  </button>
                  <button
                    className="btn btn-light"
                    onClick={() => navigate("/admin/products")}
                  >
                    Cancel
                  </button>
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
