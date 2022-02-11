import React, { PureComponent } from "react";
import "../css/admin-style.css";
import DisplayProducts from "./DisplayProducts";
import "../style.css";
import AdminLayout from "../Admin/AdminLayout";

export const ProductLayout = () => {
  return (
    <AdminLayout>
      <DisplayProducts />
    </AdminLayout>
  );
};
