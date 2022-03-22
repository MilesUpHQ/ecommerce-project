import React from "react";
import "./OrderConfirm.css";
export default function OrderTotal(props) {
  return (
    <div className="row d-flex justify-content-end">
      <div className="col-md-5">
        <table className="table table-borderless">
          <tbody className="totals">
            <tr>
              <td>
                <div className="text-left">
                  {" "}
                  <span className="text-muted">Subtotal</span>{" "}
                </div>
              </td>
              <td>
                <div className="text-right">
                  {" "}
                  <span>₹{props.Subtotal}</span>{" "}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="text-left">
                  {" "}
                  <span className="text-muted">Shipping Fee</span>{" "}
                </div>
              </td>
              <td>
                <div className="text-right">
                  {" "}
                  <span>₹{props.ShippingFee}</span>{" "}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="text-left">
                  {" "}
                  <span className="text-muted">Tax Fee</span>{" "}
                </div>
              </td>
              <td>
                <div className="text-right">
                  {" "}
                  <span>₹{props.TaxFee}</span>{" "}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="text-left">
                  {" "}
                  <span className="text-muted">Discount</span>{" "}
                </div>
              </td>
              <td>
                <div className="text-right">
                  {" "}
                  <span className="text-success">₹{props.Discount}</span>{" "}
                </div>
              </td>
            </tr>
            <tr className="border-top border-bottom">
              <td>
                <div className="text-left">
                  {" "}
                  <span className="font-weight-bold">Subtotal</span>{" "}
                </div>
              </td>
              <td>
                <div className="text-right">
                  {" "}
                  <span className="font-weight-bold">₹{props.Total}</span>{" "}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
