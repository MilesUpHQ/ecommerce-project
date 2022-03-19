import axios from "../../../utils/ajax-helper";
import React, { useEffect, useState } from "react";
import ErrorAlert from "../../Common/ErrorAlert";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    axios
      .get("/admin/orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) =>
        setErrorMsg("Sorry! Something went wrong. Please Try again")
      );
  }, []);

  return (
    <React.Fragment>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="container">
            <div className="mainHead">
              <h3>Orders</h3>
              <button
                type="button"
                className="btn btn-primary btn-icon-text disabled"
                style={{ height: "fit-content" }}
              >
                Create Order
              </button>
            </div>
            {errorMsg && <ErrorAlert msg={errorMsg} />}
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Order Id</th>
                          <th>Customer Name</th>
                          <th>Status</th>
                          <th>Total Amount</th>
                          <th>Order Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders &&
                          orders.map((order) => (
                            <tr key={order.order_id}>
                              <td>
                                <a href={`/admin/order/${order.order_id}`}>
                                  {order.order_id}
                                </a>
                              </td>
                              <td>{order.username}</td>
                              <td>
                                <label className="badge badge-success">
                                  {order.status}
                                </label>
                              </td>
                              <td>Rs. {order.total_price}</td>
                              <DateTime date={order.order_date} />
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const DateTime = ({ date }) => {
  let d = new Date(date).toDateString("en-US", {
    timeZone: "Asia/Calcutta",
  });

  let time = new Date(date).toLocaleTimeString();

  return (
    <td>
      {d} {time}
    </td>
  );
};

export default Orders;
