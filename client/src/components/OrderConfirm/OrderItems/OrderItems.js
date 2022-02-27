import React from "react";

export default function OrderItems(Items) {
  return (
    <div class="product border-bottom table-responsive">
      <table class="table table-borderless">
        <tbody>
          <tr>
            <td width="20%">
              {" "}
              <img src="https://i.imgur.com/u11K1qd.jpg" width="90" />{" "}
            </td>
            <td width="60%">
              {" "}
              <span class="font-weight-bold">Men's Sports cap</span>
              <div class="product-qty">
                {" "}
                <span class="d-block">Quantity:1</span> <span>Color:Dark</span>{" "}
              </div>
            </td>
            <td width="20%">
              <div class="text-right">
                {" "}
                <span class="font-weight-bold">$67.50</span>{" "}
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
              <span class="font-weight-bold">Men's Collar T-shirt</span>
              <div class="product-qty">
                {" "}
                <span class="d-block">Quantity:1</span>{" "}
                <span>Color:Orange</span>{" "}
              </div>
            </td>
            <td width="20%">
              <div class="text-right">
                {" "}
                <span class="font-weight-bold">$77.50</span>{" "}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
