import React from "react";
import {useParams} from "react-router-dom";
import  ProductInfo  from "./ProductInfo";
import AdminHome from "../AdminHome";
import "../css/admin-style.css";

export const ProductView = () => {
  let  { id }  = useParams("id");
  return (
    <AdminHome>
      <ProductInfo
      id={id}
      />
    </AdminHome>
  );
};
