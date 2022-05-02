import { Field, Form, Formik, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FormikForm = ({
  fields,
  ErrorSchema,
  submitHandler,
  uploadImage,
  isEnable,
}) => {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    for (let i of fields) {
      setInitialValues((prev) => ({ ...prev, [i.fieldName]: "" }));
    }
    if (uploadImage) setInitialValues((prev) => ({ ...prev, image: "" }));
  }, []);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={ErrorSchema}
        onSubmit={(values) => {
          submitHandler(values);
        }}
      >
        {({ errors, setFieldValue }) => (
          <Form className="forms-sample">
            {fields.map((field) => (
              <>
                <label className="mt-3" style={{ textTransform: "capitalize" }}>
                  {field.fieldName}*
                </label>
                <Field
                  name={field.fieldName}
                  as={field.fieldAs}
                  type={field.fieldType}
                  placeholder={field.fieldName}
                  className="form-control"
                >
                  {field.options &&
                    field.options.map((option, i) => (
                      <>
                        {i == 0 && (
                          <option value="0">Select From The Following</option>
                        )}
                        <option value={option.id}>{option.name}</option>
                      </>
                    ))}
                </Field>
                <ErrorMessage
                  name={field.fieldName}
                  component="span"
                  className="text-danger small"
                />
                <br />
              </>
            ))}

            {uploadImage && (
              <div>
                <label className="mt-3">Upload Image*</label>
                <br />
                <input
                  name="image"
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
            )}

            <div>
              <button
                type="submit"
                className={
                  "btn btn-primary mt-4 mr-2 " + `${isEnable ? "" : "disabled"}`
                }
              >
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
