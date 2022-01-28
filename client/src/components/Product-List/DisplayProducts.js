import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "../../utils/ajax-helper";
const DisplayProducts = () => {
  const [display, setdisplay] = useState([]);

  useEffect(() => {
    axios
      .get("/display")
      .then((res) => {
        console.log(res);
        setdisplay(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div class="col-lg-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Products </h4>
          <p class="card-description">Listed Products</p>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-1">
                    {display.map((display) => {
                      return <p>{display.name} </p>;
                    })}
                  </td>
                  <td>
                    {display.map((display) => {
                      return <p>{display.description} </p>;
                    })}
                  </td>
                  <td>
                    {display.map((display) => {
                      return <p>{display.price} </p>;
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DisplayProducts;
