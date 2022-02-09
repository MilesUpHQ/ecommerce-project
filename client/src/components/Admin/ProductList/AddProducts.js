import React, { PureComponent } from "react";
import FormForProducts from "./FormForProducts";
import "../css/admin-style.css";
import AdminHome from "../AdminHome";
function AddProducts() {
  return (
    <AdminHome>
      <FormForProducts />
    </AdminHome>
  );
}

export default AddProducts;
