import React from "react";
import {useParams} from "react-router-dom";
import  Productinfo  from "./Productinfo";
import AdminHome from "../AdminHome";
import "../css/admin-style.css";

export const ProductView = () => {
  let  { id }  = useParams("id");
  return (
    <AdminHome>
      <Productinfo
      id={id}
      />
    </AdminHome>
  );
};
