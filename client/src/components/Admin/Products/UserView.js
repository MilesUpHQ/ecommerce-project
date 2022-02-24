import React from 'react'
import { useParams } from "react-router-dom";
import UserInfo from "./UserInfo";

export const UserView = () => {
    let { id } = useParams("id");
    return ( 
        <UserInfo id={id} />
    );
  };
  