import React, { PureComponent } from "react";
import "../Admin/css/admin-style.css";
import DisplayProducts from "./DisplayProducts";
import "../style.css";
import AdminHome from "../Admin/AdminHome";

export const ProductLayout = () => {
  return (
      <AdminHome>
          <DisplayProducts/>
      </AdminHome>
  );
};
