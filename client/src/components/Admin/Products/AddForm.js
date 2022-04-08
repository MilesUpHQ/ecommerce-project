import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../utils/ajax-helper";
import ErrorMessages from "./ErrorMessages";
import toast, { Toaster } from "react-hot-toast";
import "../../Common/css/admin-style.css";
import FormikForm from "./FormikForm";
import * as Yup from "yup";

const AddForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [errormsg, setErrormsg] = useState(null);
  const [isEnable, setIsEnable] = useState(true);

  //sending data after usestate dec part
  const submitHandler = async (values) => {
    const imageData = {
      name: values.name,
      description: values.description,
      category: values.category,
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

  const fields = [
    { fieldName: "name", fieldType: "text" },
    { fieldName: "description", fieldType: "textarea", fieldRows: "4" },
    {
      fieldName: "category",
      fieldAs: "select",
      options: categories
    },
  ];


  const ErrorSchema = Yup.object({
    name: Yup.string().min(3, "Too short!").required("Name is Required"),
    description: Yup.string().required("Description is Required"),
    category: Yup.string().required("Category is Required"),
  });

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
                <FormikForm
                  categories={categories}
                  setErrormsg={setErrormsg}
                  fields={fields}
                  ErrorSchema={ErrorSchema}
                  submitHandler={submitHandler}
                  isEnable={isEnable}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
