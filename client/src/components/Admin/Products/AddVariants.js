import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../utils/ajax-helper";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "../../Common/css/pagination.css";

const AddVariants = () => {
  const navigate = useNavigate();
  const [isEnable, setIsEnable] = useState(true);
  const [errormsg, setErrormsg] = useState(null);
  const [fileData, setFileData] = useState([]);
  const productId = useParams().id;
  const [details, setDetails] = useState({
    size: "",
    price: "",
    color: "",
    type: "",
    id: 0,
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    const imageData = new FormData();
    imageData.append("file", fileData);
    imageData.append("price", details.price);
    imageData.append("size", details.size);
    imageData.append("color", details.color);
    imageData.append("type", details.type);
    imageData.append("id", productId);

    axios
      .post("/admin/products/variants/add", imageData)
      .then((res) => {
        setIsEnable(false);
        toast.success("Variant Added Sucessfully!");
        setTimeout(() => {
          navigate("/admin");
        }, 1500);
      })
      .catch((err) => {
        setErrormsg("Oopise! Something went wrong please try again.");
      });
  };
  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
  };
  return (
    <div className="main-panel">
      <Toaster />
      <div className="content-wrapper">
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Add Variants</h4>
                <p className="card-description">Enter varaints details</p>

                <form className="forms-sample" onSubmit={submitHandler}>
                  <div className="form-group-name">
                    <label htmlFor="exampleInputName1">Select Size</label>
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

                  <div className="form-group-pr mt-3">
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

                  <div className="form-group-img ">
                    <label htmlFor="imageupload">Upload image*</label>
                    <br />
                    <input
                      type="file"
                      name="image"
                      onChange={fileChangeHandler}
                    />
                  </div>

                  <button
                    type="submit"
                    className={
                      "btn btn-primary mr-2 " + `${isEnable ? "" : "disabled"}`
                    }
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-light"
                    onClick={() => navigate("/admin/products/add")}
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
export default AddVariants;
