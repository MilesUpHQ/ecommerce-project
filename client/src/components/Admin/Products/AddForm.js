import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../utils/ajax-helper";
import ErrorMessages from "./ErrorMessages";
import toast, { Toaster } from "react-hot-toast";
import "../../Common/css/admin-style.css";
import FormikForm from "./FormikForm";

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
        <div className="row">
          {errormsg && <ErrorMessages msg={errormsg} />}

          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Add Products</h4>
                <p className="card-description">Enter product details</p>
                <FormikForm categories={categories} setErrormsg={setErrormsg}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
