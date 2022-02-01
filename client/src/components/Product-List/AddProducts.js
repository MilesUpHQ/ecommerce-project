import React, { PureComponent } from "react";
import FormForProducts from "./FormForProducts";
import "../Admin/css/admin-style.css";
import AdminHome from "../Admin/AdminHome";
function AddProducts() {
  return (
    <AdminHome>
      <FormForProducts />
    </AdminHome>
  );
}

export default AddProducts;
