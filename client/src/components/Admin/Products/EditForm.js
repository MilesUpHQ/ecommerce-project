import React, { useState, useEffect } from "react";
import axios from "../../../utils/ajax-helper";
import ErrorMessages from "./ErrorMessages";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "../css/product.css";
import { useParams } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;
export const EditForm = () => {
  const navigate = useNavigate();
  let { id } = useParams("id");
  const [product, setProduct] = useState({});
  const [errormsg, setErrormsg] = useState(null);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryid, setCategoryId] = useState(null);
  const [productId, setProductId] = useState("");
  const [variantId, setVariantId] = useState("");
  const [isEnable, setIsEnable] = useState(true);

  const updateProduct = (e) => {
    e.preventDefault();
    const productData = {
      name:name,
      description:description,
      category:categoryid,
      id:productId,
      variantId:variantId
    }

    axios
      .put("/admin/product/edit", productData)
      .then((res) => {
        setIsEnable(false);
        toast.success("Product Updated Sucessfully!");
        setTimeout(() => {
          navigate("/admin/products");
        }, 1500);
      })
      .catch((err) => {
        setErrormsg("Sorry! Couldn't update your product.Please try again");
      });
  };
  useEffect(() => {
    axios
      .get(`/admin/product/edit/${id}`)
      .then((res) => {
        setName(res.data.name);
        setCategoryId(res.data.categoryid);
        setCategoryName(res.data.categoryname);
        setDescription(res.data.description);
        setProduct(res.data);
        setVariantId(res.data.variant_id);
        setProductId(res.data.id);
      })
      .catch((err) => {
        setErrormsg("Sorry! Something went wrong. Please Try again");
      });
  }, []);
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
  
  return (
    <div className="main-panel">
      <Toaster />
      <div className="content-wrapper">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/admin/products">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Updation
            </li>
          </ol>
        </nav>
        <div className="row">
          {errormsg && <ErrorMessages msg={errormsg} />}
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Product Updation</h4>
                <p className="card-description">Update product details</p>
                <form className="forms-sample">
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      className="form-control form-control-sm"
                      id="exampleFormControlSelect3"
                      onChange={(e) => setCategoryId(e.target.value)}
                      defaultValue={categoryName}
                    >
                      <option value={categoryid}>{categoryName}</option>
                      {categories.map((category) => {
                        return (
                          <option value={category.id} key={category.id}>
                            {category.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleTextarea1">Description</label>
                    <textarea
                      className="form-control"
                      id="exampleTextarea1"
                      rows="4"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    className={
                      "btn btn-primary mr-2" + `${isEnable ? "" : "disabled"}`
                    }
                    onClick={(e) => updateProduct(e, product.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-light"
                    onClick={(e) => navigate("/admin/products")}
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
