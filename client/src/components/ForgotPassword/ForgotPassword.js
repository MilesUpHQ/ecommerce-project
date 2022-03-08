import React from "react";
import "../ResetPassword/resetPassword.css";
import { useEffect, useState } from "react";
import axios from "../../utils/ajax-helper";
import { Button } from "react-bootstrap";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    let currentPort = window.location.href;
    if (email == "") {
      setMessage("Please enter E-mail");
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    } else {
      axios
        .post("/forgot_password", {
          email: email,
          link: currentPort.slice(0, 21),
        })
        .then((res) => {
          setMessage("Please check your inbox , we have sent an email!!");
          setTimeout(() => {
            setMessage(null);
          }, 2000);
        })
        .catch((err) => {
          setMessage("Sorry!! we could not send an email");
          setTimeout(() => {
            setMessage(null);
          }, 2000);
        });
    }
  };

  return (
    <div>
      <div style={{ background: "#fcf0e2", height: "1000px" }}>
        <div className="card" style={{ marginLeft: "30%", marginTop: "10%" }}>
          <div className="card-header">
            <h5>ForgotPassword</h5>
            <br />
            <h4 className="message">{message}</h4>
          </div>
          <div className="card-body">
            <form className="form" onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <br />
              <Button variant="primary" type="submit" className="continue">
                Continue
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
