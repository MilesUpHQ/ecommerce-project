import React from "react";

const PaymentDetails = ({ details }) => {
  return (
    <>
      <div className="col-lg-6 grid-margin">
        <div className="card" style={{maxWidth: '100%'}}>
          <div className="card-body">
            <h4 className="card-title">Payment Details</h4>
            <div className="table-responsive">
              {details &&
                details.map((detail) => (
                  <table className="table table-hover">
                    <tbody>
                      <tr>
                        <th>Payment Id</th>
                        <td>{detail.payment_id}</td>
                      </tr>
                      <tr>
                        <th>Payment Type</th>
                        <td>{detail.type}</td>
                      </tr>
                    </tbody>
                  </table>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
