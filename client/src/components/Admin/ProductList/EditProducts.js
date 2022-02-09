import React from 'react';
import {useParams} from "react-router-dom";
import AdminHome from "../AdminHome";
import { EditProductForm } from './EditProductForm';
import "../css/admin-style.css";

export const EditProducts = () => {
    let  { id }  = useParams("id");
    return (
      <AdminHome>
        <EditProductForm
        id={id}
        />
      </AdminHome>
    );
};
