import React from "react";
import AdminLayout from "../AdminLayout";
import OrderDetails from "./OrderDetails";

const OrderDetailsLayout = () => {
  return (
    <>
      <AdminLayout>
        <OrderDetails />
      </AdminLayout>
    </>
  );
};

export default OrderDetailsLayout;
