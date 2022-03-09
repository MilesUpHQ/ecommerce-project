import React, { useState, useEffect } from "react";
import axios from "../../../utils/ajax-helper";
import ErrorMessages from "./ErrorMessages";
import "../css/user.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const UserInfo = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const [errormsg, setErrormsg] = useState(null);
  useEffect(() => {
    axios
      .get(`/admin/user/${props.id}`)
      .then((res) => {
        console.log("xd", res);
        setUserInfo(res.data);
      })
      .catch((err) => {
        setErrormsg("Sorry! Something went wrong. Please Try again");
      });
  }, []);
 
  return (
    <div className="main-panel bg-light">
      <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/admin/user">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              User_Info
            </li>
          </ol>
        </nav>
        <div id="leftCol" className="a-column a-span4 dp_aib_left_column_t1">
          <div class="image-space">
            <h1 class="pdp-title">Hello</h1>
            <h1 class="pdp-name">Check</h1>
            <img class="rounded-circle z-depth-2 ml-4" 
            alt="95x95" src="https://i.guim.co.uk/img/media/ec27f69b7e4ac14838e8f71842a4cc6db3b8d69c/112_4_1179_708/master/1179.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=1cb08a39c5acdc58423974865c54d7f7"
          data-holder-rendered="true"/>
          </div>
        </div>

        <div class="view-user p-5">
          <div class="row mb-5">
            <div class="col text-center">
              <h3>
                <b>User Information</b>
              </h3>
            </div>
          </div>
          <div class="row ml-5">
            <div class="col">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">First_name</th>
                    <th scope="col">Last_name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Username</th>
                    <th scope="col">Address</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <th scope="row">{userInfo.first_name}</th>
                      <td>{userInfo.last_name}</td>
                      <td>{userInfo.email}</td>
                      <td>{userInfo.username}</td>
                      <td>Las Vegas Nevada</td>
                      <td>{userInfo.description}</td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
    </div>
    </div>
  );
};
export default UserInfo;
