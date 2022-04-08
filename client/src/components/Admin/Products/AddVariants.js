import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../utils/ajax-helper";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "../../Common/css/pagination.css";
import FormikForm from "./FormikForm";
import * as Yup from "yup";

const AddVariants = () => {
  const navigate = useNavigate();
  const [isEnable, setIsEnable] = useState(true);
  const [errormsg, setErrormsg] = useState(null);
  const productId = useParams().id;
  
  const submitHandler = async (values) => {
    const imageData = new FormData();
    imageData.append("file", values.image);
    imageData.append("price", values.price);
    imageData.append("size", values.size);
    imageData.append("color", values.color);
    imageData.append("type", values.type);
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

  const fields = [
    {
      fieldName: "size",
      fieldAs: "select",
      options: [
        { id: "XS", name: "XS" },
        { id: "S", name: "S" },
        { id: "M", name: "M" },
        { id: "L", name: "L" },
        { id: "XL", name: "XL" },
      ],
    },
    { fieldName: "price", fieldType: "number" },
    { fieldName: "color", fieldType: "text" },
    { fieldName: "type", fieldType: "text" },
  ];

  const ErrorSchema = Yup.object({
    color: Yup.string().required("Color is Required"),
    price: Yup.string().required("Price is Required"),
    size: Yup.string().required("Size is Required"),
    image: Yup.string().required("Image is Required"),
    type: Yup.string().required("Type is Required"),
  });

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
                <FormikForm
                  fields={fields}
                  ErrorSchema={ErrorSchema}
                  submitHandler={submitHandler}
                  uploadImage={true}
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
export default AddVariants;
