import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "../../utils/ajax-helper";
import ErrorMessages from "./ErrorMessages";
const DisplayProducts = () => {
  const [display, setdisplay] = useState([]);
  const[Errormsg, setErrormsg]= useState(null);

  useEffect(() => {
    axios
      .get("/admin/products")
      .then((res) => {
        console.log(res);
        setdisplay(res.data);
      })
      .catch((err) => {
        setErrormsg("Sorry! Something went wrong. Please Try again");
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
                {display.map(display=>(
                 <tr>
                   <td className="py1">
                     {display.name}
                   </td>
                   <td>
                     {display.description}
                   </td>
                   <td>
                     {display.price}
                   </td>
                 </tr> 
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DisplayProducts;
