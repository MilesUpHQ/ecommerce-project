import React from "react";
import "../OrderConfirm.css";

export default function OrderItems(Items) {
  return (
    <div className="product border-bottom table-responsive">
      <table className="table table-borderless">
        <tbody>
          <tr>
            <td width="20%">
              {" "}
              <img src="https://i.imgur.com/u11K1qd.jpg" width="90" />{" "}
            </td>
            <td width="60%">
              {" "}
              <span className="font-weight-bold">Men's Sports cap</span>
              <div className="product-qty">
                {" "}
                <span className="d-block">Quantity:1</span>{" "}
                <span>Color:Dark</span>{" "}
              </div>
            </td>
            <td width="20%">
              <div className="text-right">
                {" "}
                <span className="font-weight-bold">$67.50</span>{" "}
              </div>
            </td>
          </tr>
          <tr>
            <td width="20%">
              {" "}
              <img src="https://i.imgur.com/SmBOua9.jpg" width="70" />{" "}
            </td>
            <td width="60%">
              {" "}
              <span className="font-weight-bold">Men's Collar T-shirt</span>
              <div className="product-qty">
                {" "}
                <span className="d-block">Quantity:1</span>{" "}
                <span>Color:Orange</span>{" "}
              </div>
            </td>
            <td width="20%">
              <div className="text-right">
                {" "}
                <span className="font-weight-bold">$77.50</span>{" "}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
