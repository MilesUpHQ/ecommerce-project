import axios from "../../utils/ajax-helper";
import React, { useEffect } from "react";
import "./OrderConfirm.css";
import { AuthHeader } from "../../utils/auth-header";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function OrderItems(props) {
  const orderId = props.orderId;
  const [orderItems, setOrderItems] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [isError, setIsError] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      try {
        axios
          .get(`/order/confirm/${orderId}/items`, AuthHeader())
          .then((response) => {
            setOrderItems(response.data);
          });
      } catch (error) {
        setErrorMsg(error.message);
        setIsError(true);
      }
    };
    fetchData();
  }, [orderId]);

  return (
    <div className="product border-bottom table-responsive">
      <table className="table table-borderless">
        <tbody>
          {isError ? (
            <div className="alert alert-danger" role="alert">
              {errorMsg}
            </div>
          ) : null}
          {orderItems ? (
            <>
              {orderItems.map((item, index) => (
                <tr key={index}>
                  <td width="20%" className="items-image">
                    {" "}
                    <div className="p-2">
                      <img
                        src={BASE_URL + "/" + item.image_url}
                        alt="item_image"
                        className="img-fluid  rounded shadow-sm items-image "
                      />{" "}
                    </div>
                  </td>
                  <td width="60%">
                    {" "}
                    <span className="font-weight-bold">{item.name}</span>
                    <div className="product-qty">
                      {" "}
                      <span className="text-muted">
                        Color:{item.color}
                      </span>{" "}
                      <span className="d-block text-muted">
                        Quantity:{item.quantity}
                      </span>{" "}
                      <span className="d-block text-muted">
                        Price: ₹{item.price}
                      </span>{" "}
                    </div>
                  </td>
                  <td width="20%">
                    <div className="text-right">
                      {" "}
                      <span className="font-weight-bold">
                        ₹{item.quantity * item.price}
                      </span>{" "}
                    </div>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td colSpan="3">
                <div className="text-center">
                  <h3>No items in your order</h3>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
