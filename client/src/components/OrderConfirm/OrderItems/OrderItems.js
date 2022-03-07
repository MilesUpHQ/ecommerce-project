import React, { useEffect } from "react";
import "../OrderConfirm.css";

export default function OrderItems(props) {
  const { orderId } = props.orderId;
  const [orderItems, setOrderItems] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/order/confirm/${orderId}/items`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const responseData = await response.json();
        if (response.status === 200) {
          setOrderItems(responseData.orderItems);
        } else {
          setErrorMsg(responseData.message);
          setIsError(true);
        }
      } catch (error) {
        setErrorMsg(error.message);
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [orderId]);

  return (
    <div className="product border-bottom table-responsive">
      <table className="table table-borderless">
        <tbody>
          {orderItems ? (
            <>
              {orderItems.map((item, index) => (
                <tr key={index}>
                  <td width="20%">
                    {" "}
                    <img
                      src={item.image_url}
                      alt="item_image"
                      width="90"
                    />{" "}
                  </td>
                  <td width="60%">
                    {" "}
                    <span className="font-weight-bold">{item.name}</span>
                    <div className="product-qty">
                      {" "}
                      <span className="d-block">
                        Quantity:{item.quantity}
                      </span>{" "}
                      <span>Color:{item.color}</span>{" "}
                    </div>
                  </td>
                  <td width="20%">
                    <div className="text-right">
                      {" "}
                      <span className="font-weight-bold">
                        {item.price}
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
