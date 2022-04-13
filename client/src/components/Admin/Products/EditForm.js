import React, { useState, useEffect } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
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
  const [categoryName, setCategoryName] = useState("");
  const [categoryid, setCategoryId] = useState(null);
  const [productId, setProductId] = useState("");
  const [variantId, setVariantId] = useState("");
  const [isEnable, setIsEnable] = useState(true);
  const [initialValues, setInitialValues] = useState(null);

  const ValidationSchema = Yup.object({
    name: Yup.string().required("Name is Required"),
    category: Yup.string().required("Category is Required"),
    description: Yup.string().required("Description is Required"),
  });

  const updateProduct = (values) => {
    const productData = {
      name: values.name,
      description: values.description,
      category: values.category,
      id: productId,
      variantId: variantId,
    };

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
        setInitialValues({
          name: res.data.name,
          category: res.data.categoryid,
          description: res.data.description,
        });
        setCategoryName(res.data.categoryname);
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
                {initialValues && (
                  <Formik
                    initialValues={initialValues}
                    validationSchema={ValidationSchema}
                    onSubmit={updateProduct}
                  >
                    {({ values, handleChange, handleSubmit, errors }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="exampleInputName1">Name</label>
                          <input
                            id="name"
                            value={values.name}
                            className="form-control"
                            onChange={handleChange}
                          />
                          {errors.name ? (
                            <div className="text-danger Small">
                              {errors.name}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group">
                          <label htmlFor="category">Category</label>
                          <select
                            id="category"
                            as="select"
                            className="form-control"
                            onChange={handleChange}
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
                          {errors.category ? (
                            <div className="text-danger Small">
                              {errors.category}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group">
                          <label htmlFor="exampleTextarea1">Description</label>
                          <input
                            id="description"
                            value={values.description}
                            className="form-control"
                            onChange={handleChange}
                          />
                          {errors.description ? (
                            <div className="text-danger Small">
                              {errors.description}
                            </div>
                          ) : null}
                        </div>
                        <input
                          className={
                            "btn btn-primary mr-2" +
                            `${isEnable ? "" : "disabled"}`
                          }
                          type="submit"
                          value="Update"
                        />
                        <button
                          className="btn btn-light"
                          onClick={(e) => navigate("/admin/products")}
                        >
                          Cancel
                        </button>
                      </form>
                    )}
                  </Formik>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
