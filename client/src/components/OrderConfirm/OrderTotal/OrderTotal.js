import React from "react";

export default function OrderTotal(
  Subtotal,
  ShippingFee,
  TaxFee,
  Discount,
  Total
) {
  return (
    <div class="row d-flex justify-content-end">
      <div class="col-md-5">
        <table class="table table-borderless">
          <tbody class="totals">
            <tr>
              <td>
                <div class="text-left">
                  {" "}
                  <span class="text-muted">Subtotal</span>{" "}
                </div>
              </td>
              <td>
                <div class="text-right">
                  {" "}
                  <span>{Subtotal}</span>{" "}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="text-left">
                  {" "}
                  <span class="text-muted">Shipping Fee</span>{" "}
                </div>
              </td>
              <td>
                <div class="text-right">
                  {" "}
                  <span>{ShippingFee}</span>{" "}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="text-left">
                  {" "}
                  <span class="text-muted">Tax Fee</span>{" "}
                </div>
              </td>
              <td>
                <div class="text-right">
                  {" "}
                  <span>{TaxFee}</span>{" "}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="text-left">
                  {" "}
                  <span class="text-muted">Discount</span>{" "}
                </div>
              </td>
              <td>
                <div class="text-right">
                  {" "}
                  <span class="text-success">${Discount}</span>{" "}
                </div>
              </td>
            </tr>
            <tr class="border-top border-bottom">
              <td>
                <div class="text-left">
                  {" "}
                  <span class="font-weight-bold">Subtotal</span>{" "}
                </div>
              </td>
              <td>
                <div class="text-right">
                  {" "}
                  <span class="font-weight-bold">${Total}</span>{" "}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
