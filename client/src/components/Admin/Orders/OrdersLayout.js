import React from "react";
import AdminLayout from "../AdminLayout";
import "../css/admin-style.css";
import Orders from "./Orders";


const OrdersLayout = () => {
  return (
    <>
      <AdminLayout>
        <Orders />
      </AdminLayout>
    </>
  );
};

export default OrdersLayout;
