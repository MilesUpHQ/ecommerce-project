import React from "react";
import "./FailedError.css";
export default function FailedError() {
  return (
    <div className="main-error-page">
      <img src="/images/error.svg" alt="Error " />
      <h1 className="error-title">
        Woops! <br />
        Something went wrong :(
      </h1>
      <h2 className="error-subtitle">Please try again later or contact us.</h2>
      <a href="/cart" className="error-link">
        Go back to cart
      </a>
    </div>
  );
}
