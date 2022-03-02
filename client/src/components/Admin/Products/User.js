import React, { PureComponent } from 'react';
import "../css/admin-style.css";
import UserList from "./UserList";
import "../../style.css";
import AdminLayout from "../AdminLayout";

export const User = () => {
  return (
    <AdminLayout>
      <UserList />
    </AdminLayout>
  );
};