import React from "react";
import "./OrderConfirm.css";
import OrderInfo from "./OrderInfo/OrderInfo";
import OrderItems from "./OrderItems/OrderItems";
import OrderTotal from "./OrderTotal/OrderTotal";
function OrderConfirm() {
  const [orderItems, setOrderItems] = React.useState([]);
  const [orderInfo, setOrderInfo] = React.useState({});
  const [total, setTotal] = React.useState(0);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  return (
    <div class="container mt-5 mb-5">
      <div class="row d-flex justify-content-center">
        <div class="col-md-8">
          <div class="card">
            {isError ? (
              <div class="alert alert-danger" role="alert">
                {errorMsg}
              </div>
            ) : (
              <div class="invoice p-5">
                <h5>Your order Confirmed!</h5>{" "}
                <span class="font-weight-bold d-block mt-4">Hello, Mani</span>{" "}
                <span>
                  You order has been confirmed and will be shipped in next two
                  days!
                </span>
                <OrderInfo
                  Date={new Date()}
                  No={"SHOP0001"}
                  Payment={"Master Card"}
                  Address="Tirupati"
                />
                <OrderItems Items={orderItems} />
                <OrderTotal
                  Subtotal={200}
                  ShippingFeet={5}
                  TaxFee={5}
                  Discount={0}
                  Total={210}
                />
                <p>
                  We will be sending shipping confirmation email when the item
                  shipped successfully!
                </p>
                <p class="font-weight-bold mb-0">
                  Thanks for shopping with us!
                </p>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirm;
