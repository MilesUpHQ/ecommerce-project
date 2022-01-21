import React from "react";
import Category from "./Category";
import { Helmet } from "react-helmet";
import AdminHome from "../AdminHome";

const CategoryLayout = () => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/css/style.css" />
      </Helmet>
      <AdminHome>
        <Category />
      </AdminHome>
    </>
  );
};

export default CategoryLayout;
