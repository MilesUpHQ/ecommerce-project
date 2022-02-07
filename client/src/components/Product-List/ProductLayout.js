import React, { PureComponent } from "react";
//import {useParams} from "react-router-dom";
import "../Admin/css/admin-style.css";
import DisplayProducts from "./DisplayProducts";
import "../style.css";
import 'font-awesome/css/font-awesome.min.css';
import AdminHome from "../Admin/AdminHome";

export const ProductLayout = () => {
//let  { id }  = useParams("id");
  return (
      <AdminHome>
          <DisplayProducts />
      </AdminHome>
  );
};
