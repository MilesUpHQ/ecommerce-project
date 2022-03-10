import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../utils/ajax-helper";
import AddressDetails from "./AddressDetails";
import PaymentDetails from "./PaymentDetails";
import "./OrderDetails.css";

const OrderDetails = () => {
  const { id } = useParams();
  const [orderDate, setOrderDate] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    axios
      .get(`/admin/orders/${id}`)
      .then((res) => {
        let date = new Date(res.data.orderDetails[0].order_date).toDateString(
          "en-US",
          {
            timeZone: "Asia/Calcutta",
          }
        );
        setOrderDate(date);
        setOrderDetails(res.data.orderDetails);
        setOrderItems(res.data.orderItems);
        setPaymentDetails(res.data.paymentDetails);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="container">
            <div>
              <h3>#{orderDetails[0] && orderDetails[0].order_id}</h3>
              <div className="orderStats">
                <h4>{orderDate}</h4>
                <h4 className="badge badge-success">
                  {orderDetails[0] && orderDetails[0].status}
                </h4>
              </div>
            </div>
            <br />
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Product Name</th>
                          <th>Quantity</th>
                          <th>Size</th>
                          <th>Color</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderItems &&
                          orderItems.map((item) => (
                            <tr>
                              <td>{item.name}</td>
                              <td>{item.quantity}</td>
                              <td>{item.size}</td>
                              <td>{item.color}</td>
                              <td>{item.price}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {orderDetails[0] && (
                <AddressDetails orderDetails={orderDetails[0]} />
              )}
              <PaymentDetails details={paymentDetails} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderDetails;
