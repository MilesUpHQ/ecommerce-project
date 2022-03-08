import React from "react";
import AdminLayout from "../AdminLayout";
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
