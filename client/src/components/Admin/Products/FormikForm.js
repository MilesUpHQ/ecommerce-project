import axios from "../../../utils/ajax-helper";
import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

const FormikForm = ({ categories, setErrormsg }) => {
  const navigate = useNavigate();

  const ErrorSchema = Yup.object({
    name: Yup.string().min(3, "Too short!").required("Name is Required"),
    color: Yup.string().required("Color is Required"),
    price: Yup.string().required("Price is Required"),
    description: Yup.string().required("Description is Required"),
    size: Yup.string().required("Size is Required"),
    category: Yup.string().required("Category is Required"),
    image: Yup.string().required("Image is Required"),
    type: Yup.string().required("Type is Required"),
  });

  const submitHandler = async (details) => {
    const imageData = new FormData();
    imageData.append("file", details.image);
    imageData.append("name", details.name);
    imageData.append("price", details.price);
    imageData.append("description", details.description);
    imageData.append("size", details.size);
    imageData.append("color", details.color);
    imageData.append("type", details.type);
    imageData.append("category", details.category);

    axios
      .post("/admin/products/add", imageData)
      .then((res) => {
        toast.success("Product Created Sucessfully!");
        setTimeout(() => {
          navigate("/admin/products");
        }, 1500);
      })
      .catch((err) => {
        setErrormsg('Oopise! Something went wrong please try again.')
      });
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          color: "",
          price: "",
          description: "",
          size: "",
          category: "",
          image: "",
          type: "",
        }}
        validationSchema={ErrorSchema}
        onSubmit={(values) => {
          submitHandler(values);
        }}
      >
        {({ errors, setFieldValue }) => (
          <Form className="forms-sample">
            <label htmlFor="name">Name*</label>
            <Field name="name" className="form-control" />
            <ErrorMessage
              name="name"
              component="span"
              className="text-danger small"
            />
            <div>
              <label htmlFor="color" className="mt-3">
                Color*
              </label>
              <Field name="color" className="form-control" />
              <ErrorMessage
                name="color"
                component="span"
                className="text-danger small"
              />
            </div>

            <div>
              <label htmlFor="type" className="mt-3">
                Type*
              </label>
              <Field name="type" className="form-control" />
              <ErrorMessage
                name="type"
                component="span"
                className="text-danger small"
              />
            </div>
            <div>
              <label htmlFor="price" className="mt-3">
                Price*
              </label>
              <Field name="price" type="number" className="form-control" />
              <ErrorMessage
                name="price"
                component="span"
                className="text-danger small"
              />
            </div>

            <div>
              <label htmlFor="size" className="mt-3">
                Size*
              </label>
              <Field
                as="select"
                name="size"
                className="form-control form-control-sm"
              >
                <option value="0">Select product size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </Field>
              <ErrorMessage
                name="size"
                component="span"
                className="text-danger small"
              />
            </div>

            <div>
              <label htmlFor="category" className="mt-3">
                Category*
              </label>
              <Field
                as="select"
                name="category"
                className="form-control form-control-sm"
              >
                <option value="0">Select From The Following</option>
                {categories.map((Category) => {
                  return (
                    <option value={Category.id} key={Category.id}>
                      {Category.name}
                    </option>
                  );
                })}
              </Field>
              <ErrorMessage
                name="category"
                component="span"
                className="text-danger small"
              />
            </div>

            <div>
              <label htmlFor="description" className="mt-3">
                Description*
              </label>
              <Field
                as="textarea"
                name="description"
                className="form-control"
                rows="4"
                maxLength="100"
                placeholder="Describe your product within 100 words"
              />
              <ErrorMessage
                name="description"
                component="span"
                className="text-danger small"
              />
            </div>

            <div>
              <label htmlFor="image" className="mt-3">
                Upload Image*
              </label>
              <br />
              <input
                type="file"
                onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
              />
              <br />
              <ErrorMessage
                name="image"
                component="span"
                className="text-danger small"
              />
            </div>

            <div>
              <button type="submit" className="btn btn-primary mt-4 mr-4">
                Submit
              </button>

              <button
                className="btn btn-light mt-4"
                onClick={() => navigate("/admin/products")}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormikForm;
