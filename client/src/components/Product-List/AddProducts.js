import React, { PureComponent } from "react";
import FormForProducts from "./FormForProducts";
import "../Admin/css/admin-style.css";
import AdminLayout from "../Admin/AdminLayout";
function AddProducts() {
  return (
    <AdminLayout>
      <FormForProducts />
    </AdminLayout>
  );
}

export default AddProducts;
