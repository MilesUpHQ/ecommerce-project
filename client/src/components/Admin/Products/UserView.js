import React from 'react'
import { useParams } from "react-router-dom";
import UserInfo from "./UserInfo";
import AdminLayout from "../AdminLayout";

export const UserView = () => {
    let { id } = useParams("id");
    return ( 
        <AdminLayout>
        <UserInfo id={id} />
        </AdminLayout>
    );
  };
  