import React, { PureComponent } from "react";
import AddForm from "./AddForm";
import "../css/admin-style.css";
import AdminHome from "../AdminHome";
function AddProducts() {
  return (
    <AdminHome>
      <AddForm />
    </AdminHome>
  );
}

export default AddProducts;
