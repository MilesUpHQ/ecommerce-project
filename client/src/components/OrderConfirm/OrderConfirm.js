import React, { useEffect, useState } from "react";
import "./OrderConfirm.css";
import OrderInfo from "./OrderInfo";
import OrderItems from "./OrderItems";
import OrderTotal from "./OrderTotal";
import SimpleNavBar from "../SimpleNavBar/SimpleNavBar";
import { useParams } from "react-router-dom";
import axios from "../../utils/ajax-helper";
import { AuthHeader } from "../../utils/auth-header";

function OrderConfirm() {
  const orderId = useParams().id;

  const [orderInfo, setOrderInfo] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [isError, setIsError] = useState(false);
  const [address, setAddress] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      try {
        axios
          .get(`/order/confirm/${orderId}`, AuthHeader())
          .then((response) => {
            console.log(response.data);
            setOrderInfo(response.data);
            const order_address = [
              response.data[0].street,
              response.data[0].city,
              response.data[0].state,
              response.data[0].country,
              response.data[0].pin_code,
            ];
            setAddress(order_address);
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
                <div className="alert alert-danger" role="alert">
                  {errorMsg}
                </div>
              ) : (
                <>
                  {orderInfo ? (
                    <>
                      <div className="invoice p-5">
                        <h5>Your order Confirmed!</h5>{" "}
                        <span className="font-weight-bold d-block mt-4">
                          Hello, {orderInfo[0]?.name}
                        </span>
                        <span>
                          <br />
                          You order has been confirmed and will be shipped in
                          next few days!
                        </span>
                        <OrderInfo
                          Date={new Date(
                            orderInfo[0]?.order_date || new Date()
                          ).toLocaleDateString()}
                          No={orderInfo[0]?.order_id}
                          Payment={orderInfo[0]?.type}
                          Address={address}
                        />
                        <OrderItems orderId={orderId} />
                        <OrderTotal
                          Subtotal={orderInfo[0]?.total_price}
                          ShippingFee={0}
                          TaxFee={0}
                          Discount={0}
                          Total={orderInfo[0]?.total_price}
                        />
                        <p>
                          We will be sending shipping confirmation email when
                          the item shipped successfully!
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
                    </>
                  ) : (
                    <div className="text-center">
                      <h3>No items in your order</h3>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderConfirm;
