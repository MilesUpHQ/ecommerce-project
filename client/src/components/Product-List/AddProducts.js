import React, { PureComponent } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "./Form";
import "../style.css";
import AdminHome from "../Admin/AdminHome";
function AddProducts() {
  return (
    <AdminHome>
      <Form />
    </AdminHome>
  );
}

export default AddProducts;
