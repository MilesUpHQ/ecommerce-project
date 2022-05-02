import React, { useState, useEffect } from "react";
import axios from "../../../utils/ajax-helper";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import ErrorMessages from "./ErrorMessages";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "../css/product.css";
import { useParams } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;
export const EditVariant = () => {
  const [errormsg, setErrormsg] = useState(null);
  const navigate = useNavigate();
  const [imageCheck, setImageCheck] = useState(false);
  const [fileData, setFileData] = useState([]);
  const [variant, setVariant] = useState({});
  const [type, setType] = useState("");
  const [productId, setProductId] = useState("");
  const [variantId, setVariantId] = useState("");
  const [initialValues, setInitialValues] = useState(null);
  let { id } = useParams("id");

  const ValidationSchema = Yup.object({
    price: Yup
    .string()
    .required("*Price is Required"),
    size: Yup
    .string()
    .required("*Size is Required"),
    color: Yup
    .string()
    .required("*Color is Required")
    .matches(/^[a-zA-Z ]+$/, "*Color must contain only letters")
    .min(2, "*Please enter a valid color!"),
  });

  const updateVariant = (values) => {
    
    const imageData = new FormData();
    imageData.append("file", fileData);
    imageData.append("price", values.price);
    imageData.append("size", values.size);
    imageData.append("color", values.color);
    imageData.append("type", values.type);
    imageData.append("variantId", variantId);
    imageData.append("productId", productId);
    
    axios
      .put("/admin/product/variant/edit", imageData)
      .then((res) => {
        toast.success("Variant Updated Sucessfully!");
        setTimeout(() => {
          navigate(`/admin/products/${productId}/view`);
        }, 1500);
      })
      .catch((err) => {
        setErrormsg("Sorry! Couldn't update this variant.Please try again");
      });
  };

  useEffect(() => {
    axios
      .get(`/admin/product/variant/${id}`)
      .then((res) => {
        setInitialValues({
          size: res.data.size,
          color: res.data.color,
          price: res.data.price,
          type: res.data.type,
        });
        setVariantId(res.data.id);
        setProductId(res.data.pid);
        setFileData(res.data.image_url);
        setVariant(res.data);
        setImageCheck(true);
      })
      .catch((err) => {
        setErrormsg("Sorry! Something went wrong. Please Try again");
      });
  }, []);

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
  };

  return (
    <div className="main-panel">
      <Toaster />
      <div className="content-wrapper">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/admin">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Update variants
            </li>
          </ol>
        </nav>
        <div className="row">
          {errormsg && <ErrorMessages msg={errormsg} />}
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Variant Updation</h4>
                <p className="card-description">Update variant details</p>
                {initialValues && (
                  <Formik
                    initialValues={initialValues}
                    validationSchema={ValidationSchema}
                    onSubmit={updateVariant}
                  >
                    {({ values, handleChange, handleSubmit, errors, handleBlur }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="exampleFormControlSelect3">
                            Select Size
                          </label>
                          <select
                          name="size"
                            className="form-control form-control-sm"
                            id="exampleFormControlSelect3"
                            value={values.size}
                            onChange={handleChange("size")}
                            onBlur={handleBlur}
                          >
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                          </select>
                          {errors.size ? (
                            <div className="text-danger Small">
                              {errors.size}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group">
                          <label htmlFor="Color">Color</label>
                          <input
                            type="text"
                            className="form-control"
                            id="color"
                            value={values.color}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.color ? (
                            <div className="text-danger Small">
                              {errors.color}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group">
                          <label htmlFor="Type">Type</label>
                          <input
                            type="text"
                            className="form-control"
                            id="type"
                            value={values.type}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="exampleInputPrice1">Price</label>
                          <input
                            type="number"
                            className="form-control"
                            id="exampleInputPrice1"
                            value={values.price}
                            onChange={handleChange("price")}
                            onBlur={handleBlur}
                          />
                          {errors.price ? (
                            <div className="text-danger Small">
                              {errors.price}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="imageupload">Upload image</label>
                          <br />
                          {imageCheck == true && (
                            <div>
                              <input
                                type="url"
                                name="urlField"
                                value={fileData}
                                readOnly
                              />
                              <img
                                className="rounded-circlee ml-3"
                                src={BASE_URL + "/" + fileData}
                                alt=""
                              />
                              <button
                                type="button"
                                className="btn btn-primary btn-icon-text mt-1 ml-3"
                                onClick={() => setImageCheck(false)}
                              >
                                Update Image
                              </button>
                            </div>
                          )}
                          {imageCheck == false && (
                            <input
                              type="file"
                              name="image"
                              onChange={fileChangeHandler}
                            />
                          )}
                        </div>

                        <input
                          className="btn btn-primary mr-2"
                          type="submit"
                          value="Update"
                        />
                        <button
                          className="btn btn-light"
                          onClick={(e) =>
                            navigate(`/admin/products/${productId}/view`)
                          }
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
