import React from "react";

export default function OrderInfo(Date, No, Payment, Address) {
  return (
    <div class="payment border-top mt-3 mb-3 border-bottom table-responsive">
      <table class="table table-borderless">
        <tbody>
          <tr>
            <td>
              <div class="py-2">
                {" "}
                <span class="d-block text-muted">Order Date</span>{" "}
                <span>{Date}</span>{" "}
              </div>
            </td>
            <td>
              <div class="py-2">
                {" "}
                <span class="d-block text-muted">Order No</span>{" "}
                <span>{No}</span>{" "}
              </div>
            </td>
            <td>
              <div class="py-2">
                {" "}
                <span class="d-block text-muted">Payment</span>{" "}
                <span>
                  <img
                    src="https://img.icons8.com/color/48/000000/mastercard.png"
                    width="20"
                  />
                  {Payment}
                </span>{" "}
              </div>
            </td>
            <td>
              <div class="py-2">
                {" "}
                <span class="d-block text-muted">Shiping Address</span>{" "}
                <span>{Address}</span>{" "}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
