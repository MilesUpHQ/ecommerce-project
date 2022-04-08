import axios from "../../utils/ajax-helper";
import React, { useEffect, Component } from "react";
import { getJWT } from "../../utils/jwt";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      isDisabledButton: false,
    };
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    this.setState({
      error: "",
      isDisabledButton: true,
    });
    axios
      .post("/getToken", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        localStorage.setItem("ecom_token", res.data.token);
        this.props.navigate("/");
      })
      .catch((err) => {
        this.setState({
          error: "Invalid Credentials",
          isDisabledButton: false,
        });
      });
  }
  render() {
    const validationSchema = Yup.object({
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required"),
      password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),
    });
    const initialValues = {
      email: "",
      password: "",
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                {this.state.error ? (
                  <div className="alert alert-danger">{this.state.error}</div>
                ) : null}
                <h1 className="card-title text-center mb-5 fw-light fs-5">
                  <span>Login</span>
                </h1>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={this.submit}
                >
                  {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    handleBlur,
                    isValid,
                  }) => (
                    <form onSubmit={handleSubmit} id="form" className="form">
                      <div className="form-group">
                        <div className="form-floating mb-3">
                          <input
                            type="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            required={true}
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="Email"
                          />
                          <label htmlFor="email">Email address</label>
                          <ErrorMessage
                            name="email"
                            component="span"
                            className="text-danger small"
                          />
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            name="password"
                            type="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            required={true}
                            className="form-control"
                            id="password"
                            placeholder="Password"
                          />
                          <label htmlFor="password">Password</label>
                          <ErrorMessage
                            name="password"
                            component="span"
                            className="text-danger small"
                          />
                        </div>
                        <div className="form-group text-center">
                          {this.state.isDisabledButton ? (
                            <>
                              <Button variant="primary" type="submit" disabled>
                                Login
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button variant="primary" type="submit">
                                Login
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
                    <a href="/forgot_password">Forgot Password?</a>
                  </p>
                </div>
                <div className="text-center">
                  <p>
                    Don't have an account? <a href="/signup">Sign up</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  useEffect(() => {
    if (getJWT()) {
      navigate("/");
    }
  });
  return <Login {...props} navigate={navigate} />;
}
export default WithNavigate;
