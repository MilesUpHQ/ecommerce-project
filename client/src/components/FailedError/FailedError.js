import React from "react";
import "./FailedError.css";
export default function FailedError() {
  return (
    <div class="main-error-page">
      <img src="/images/error.svg" alt="Error " />
      <h1 class="error-title">
        Woops! <br />
        Something went wrong :(
      </h1>
      <h2 class="error-subtitle">Please try again later or contact us.</h2>
      <a href="/cart" class="error-link">
        Go back to cart
      </a>
    </div>
  );
}
