import React from "react";
import "./OrderConfirm.css";

export default function OrderInfo(props) {
  return (
    <div className="payment border-top mt-3 mb-3 border-bottom table-responsive">
      <table className="table table-borderless">
        <tbody>
          <tr>
            <td>
              <div className="py-2">
                {" "}
                <span className="d-block text-muted">Order Date</span>{" "}
                <span>{props.Date}</span>{" "}
              </div>
            </td>
            <td>
              <div className="py-2">
                {" "}
                <span className="d-block text-muted">Order No</span>{" "}
                <span>{props.No}</span>{" "}
              </div>
            </td>
            <td>
              <div className="py-2">
                {" "}
                <span className="d-block text-muted">Payment</span>{" "}
                <span>
                  <img
                    src="https://img.icons8.com/color/48/000000/mastercard.png"
                    width="20"
                  />
                  {props.Payment}
                </span>{" "}
              </div>
            </td>
            <td>
              <div className="py-2">
                {" "}
                <span className="d-block text-muted">Shiping Address</span>{" "}
                <span>{props.Address}</span>{" "}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
