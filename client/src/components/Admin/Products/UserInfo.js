import React, { useState, useEffect } from "react";
import axios from "../../../utils/ajax-helper";
import ErrorMessages from "./ErrorMessages";
import { FaUser } from 'react-icons/fa';
import { useParams } from "react-router-dom";
import "../css/user.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const UserInfo = (props) => {
  let { id } = useParams("id");
  const [userInfo, setUserInfo] = useState({});
  const [errormsg, setErrormsg] = useState(null);
  useEffect(() => {
    axios
      .get(`/admin/user/${id}`)
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => {
        setErrormsg("Sorry! Something went wrong. Please Try again");
      });
  }, []);
 
  return (
    <div className="main-panel bg-light">
      <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/admin/user">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              User Info
            </li>
          </ol>
        </nav>
        <div id="leftCol" className="a-column a-span4 dp_aib_left_column_t1">
          <div className="image-space">
            <h2 className="pdp-title ml-4">{userInfo.first_name} {userInfo.last_name}</h2>
            <h1 className="avatar ml-4"><FaUser /></h1>
          </div>
        </div>

        <div className="view-user p-2">
          <div className="row mb-5">
            <div className="col text-center">
              <h3>
                <b>User Information</b>
              </h3>
            </div>
          </div>
          <div className="row ml-4">
            <div className="col">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">First_name</th>
                    <th scope="col">Last_name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Username</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <th scope="row">{userInfo.first_name}</th>
                      <td>{userInfo.last_name}</td>
                      <td>{userInfo.email}</td>
                      <td>{userInfo.username}</td>
                      <td>{userInfo.phone}</td>
                      <td>{userInfo.street},{userInfo.city}<br/><br/>{userInfo.state},
                      {userInfo.pin_code},{userInfo.country}</td>
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
