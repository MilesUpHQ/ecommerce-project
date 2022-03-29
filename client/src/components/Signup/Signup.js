import React, { useState } from "react";
import axios from "../../utils/ajax-helper";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";

export default function Signup() {
  const [error, setError] = useState(null);
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .matches(/^[a-zA-Z ]+$/, "First name must contain only letters")
      .min(2, "Too Short!")
      .max(20, "Too Long!"),
    lastName: Yup.string()
      .required("Last name is required")
      .matches(/^[a-zA-Z]+$/, "Last name must be alphabets only")
      .min(2, "Too Short!")
      .max(20, "Too Long!"),
    userName: Yup.string()
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Username can only contain letters and numbers"
      )
      .required("Username is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  };

  const signup = (values) => {
    setError(null);
    setIsDisabledButton(true);
    axios
      .post("/signup", {
        first_name: values.firstName,
        last_name: values.lastName,
        username: values.userName,
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        toast.success("User Created Sucessfully! Please Login.");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((err) => {
        setIsDisabledButton(false);
        if (err.response) {
          setError(err.response.data.message);
        }
        if (err.response.data[0].msg) {
          setError(err.response.data[0].msg);
        } else {
          setError(err);
        }
      });
  };
  return (
    <div className="container">
      <Toaster />
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              {error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : (
                <></>
              )}
              <h1 className="card-title text-center mb-5 fw-light fs-5">
                <span>Signup</span>
              </h1>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={signup}
              >
                {({
                  values,
                  handleChange,
                  handleSubmit,
                  errors,
                  handleBlur,
                  isValid,
                }) => (
                  <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                      <div className="form-floating mb-3">
                        <input
                          required={true}
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control"
                          id="firstName"
                          placeholder="First Name"
                          value={values.firstName}
                        />
                        <label htmlFor="first_name">First Name *</label>
                        <ErrorMessage
                          name="firstName"
                          component="span"
                          className="text-danger small"
                        />
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          required={true}
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control"
                          id="lastName"
                          placeholder="Last Name"
                          value={values.lastName}
                        />
                        <label htmlFor="last_name">Last Name *</label>
                        <ErrorMessage
                          name="lastName"
                          component="span"
                          className="text-danger small"
                        />
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          required={true}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control"
                          id="userName"
                          placeholder="Username"
                          value={values.userName}
                        />
                        <label htmlFor="username">Username *</label>
                        <ErrorMessage
                          name="userName"
                          component="span"
                          className="text-danger small"
                        />
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          required={true}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control"
                          id="email"
                          placeholder="Email"
                          value={values.email}
                        />
                        <label htmlFor="email">Email address *</label>
                        <ErrorMessage
                          name="email"
                          component="span"
                          className="text-danger small"
                        />
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          required={true}
                          type="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control"
                          id="password"
                          placeholder="Password"
                          value={values.password}
                        />
                        <label htmlFor="password">Password *</label>
                        <ErrorMessage
                          name="password"
                          component="span"
                          className="text-danger small"
                        />
                      </div>
                      <div className="form-group text-center">
                        {isDisabledButton ? (
                          <>
                            <Button variant="primary" type="submit" disabled>
                              Signup
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="primary" type="submit">
                              Signup
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </form>
                )}
              </Formik>

              <div className="text-center">
                <p>
                  Already have an account? <a href="/login">Login</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
