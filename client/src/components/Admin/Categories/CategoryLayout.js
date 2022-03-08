import React from "react";
import Category from "./Category";
import AdminLayout from "../AdminLayout";
import "../css/admin-style.css";

const CategoryLayout = () => {
  return (
    <>
      <AdminLayout>
        <Category />
      </AdminLayout>
    </>
  );
};

export default CategoryLayout;
