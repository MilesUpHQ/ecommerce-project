import React, { PureComponent } from "react";
import "../../Common/css/admin-style.css";
import DisplayProducts from "./DisplayProducts";
import "../../style.css";
import AdminLayout from "../AdminLayout";

export const ProductLayout = () => {
  return (
    <AdminLayout>
      <DisplayProducts />
    </AdminLayout>
  );
};
