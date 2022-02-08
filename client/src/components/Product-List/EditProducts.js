import React from 'react';
import {useParams} from "react-router-dom";
import AdminHome from "../Admin/AdminHome";
import { UpdateProducts } from './UpdateProducts';
import "../Admin/css/admin-style.css";

export const EditProducts = () => {
    let  { id }  = useParams("id");
    return (
      <AdminHome>
        <UpdateProducts
        id={id}
        />
      </AdminHome>
    );
};
