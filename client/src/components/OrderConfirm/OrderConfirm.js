import React from "react";
import "./OrderConfirm.css";
import OrderInfo from "./OrderInfo";
import OrderItems from "./OrderItems";
import OrderTotal from "./OrderTotal";
import SimpleNavBar from "../SimpleNavBar/SimpleNavBar";
import { useParams } from "react-router-dom";
import axios from "../../utils/ajax-helper";

function OrderConfirm() {
  const [orderInfo, setOrderInfo] = React.useState({});
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [isError, setIsError] = React.useState(false);

  const { orderId } = useParams();
  React.useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      try {
        axios.get(`/order/confirm/${orderId}`).then((response) => {
          console.log(response.data);
          setOrderInfo(response.data);
        });
      } catch (error) {
        setErrorMsg(error.message);
        setIsError(true);
      }
    };
    fetchData();
  }, [orderId]);

  return (
    <>
      <SimpleNavBar />

      <div className="container mt-5 mb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              {isError ? (
                <div class="alert alert-danger" role="alert">
                  {errorMsg}
                </div>
              ) : (
                <div className="invoice p-5">
                  <h5>Your order Confirmed!</h5>{" "}
                  <span className="font-weight-bold d-block mt-4">Hello,</span>{" "}
                  <span>
                    You order has been confirmed and will be shipped in next few
                    days!
                  </span>
                  <OrderInfo
                    Date={new Date().toLocaleDateString()}
                    No="SHOP0001"
                    Payment="Master Card"
                    Address="Tirupati"
                  />
                  <OrderItems orderId={orderId} />
                  <OrderTotal
                    Subtotal={200}
                    ShippingFee={5}
                    TaxFee={5}
                    Discount={0}
                    Total={210}
                  />
                  <p>
                    We will be sending shipping confirmation email when the item
                    shipped successfully!
                  </p>
                  <p className="font-weight-bold mb-0">
                    Thanks for shopping with us!
                  </p>{" "}
                  <div className="text-center mt-5">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        window.location.href = "/";
                      }}
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderConfirm;
