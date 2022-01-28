import React, { PureComponent } from "react";
import "bootstrap/dist/css/bootstrap.css";
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
