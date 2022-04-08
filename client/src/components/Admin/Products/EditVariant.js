import React, { useState, useEffect } from "react";
import axios from "../../../utils/ajax-helper";
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
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [variant, setVariant] = useState({});
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [productId, setProductId] = useState("");
  const [variantId, setVariantId] = useState("");
  let { id } = useParams("id");

  const updateVariant = (e) => {
    e.preventDefault();
    const imageData = new FormData();
    imageData.append("file", fileData);
    imageData.append("price", price);
    imageData.append("size", size);
    imageData.append("color", color);
    imageData.append("type", type);
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
        setSize(res.data.size);
        setColor(res.data.color);
        setType(res.data.type);
        setPrice(res.data.price);
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

                <div className="form-group ">
                  <label htmlFor="exampleFormControlSelect3">Select Size</label>
                  <select
                    className="form-control form-control-sm"
                    id="exampleFormControlSelect3"
                     value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
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
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />

                  <div className="form-group">
                    <label htmlFor="Type">Type</label>
                    <input
                      type="text"
                      className="form-control"
                      id="type"
                       value={type}
                      onChange={(e) => setType(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputPrice1">Price</label>
                    <input
                      type="integer"
                      className="form-control"
                      id="exampleInputPrice1"
                      value={price}
                       onChange={(e) => setPrice(e.target.value)}
                    />
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

                     <button
                    className={
                      "btn btn-primary mr-2"
                    }
                    onClick={(e) => updateVariant(e)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-light"
                   onClick={(e) => navigate(`/admin/products/${productId}/view`)}
                  >
                    Cancel
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
