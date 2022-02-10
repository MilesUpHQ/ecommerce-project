import React, { PureComponent } from "react";
import "../css/admin-style.css";
import DisplayProducts from "./DisplayProducts";
import "../../style.css";
import 'font-awesome/css/font-awesome.min.css';
import AdminHome from "../AdminHome";

export const ProductLayout = () => {
  return (
      <AdminHome>
          <DisplayProducts />
      </AdminHome>
  );
};
