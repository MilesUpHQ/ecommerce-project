import React from "react";

const AddressDetails = ({ orderDetails }) => {
  return (
    <>
      <div className="col-lg-6 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Address</h4>
            <div className="table-responsive">
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <th>Customer Name</th>
                    <td>{orderDetails.name}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{orderDetails.email}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{orderDetails.phone}</td>
                  </tr>
                  <tr>
                    <th>Street</th>
                    <td>{orderDetails.street}</td>
                  </tr>
                  <tr>
                    <th>City</th>
                    <td>{orderDetails.city}</td>
                  </tr>
                  <tr>
                    <th>State</th>
                    <td>{orderDetails.state}</td>
                  </tr>
                  <tr>
                    <th>Country</th>
                    <td>{orderDetails.country}</td>
                  </tr>
                  <tr>
                    <th>Pincode</th>
                    <td>{orderDetails.pin_code}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressDetails;
