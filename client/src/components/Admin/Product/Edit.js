import React from 'react';
import {useParams} from "react-router-dom";
import AdminHome from "../AdminHome";
import { EditForm } from './EditForm';
import "../css/admin-style.css";

export const Edit = () => {
    let  { id }  = useParams("id");
    return (
      <AdminHome>
        <EditForm
        id={id}
        />
      </AdminHome>
    );
};
