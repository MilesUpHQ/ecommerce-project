import React from "react";
import { useEffect, useState, useMemo } from "react";
import axios from "../../utils/ajax-helper";
import { useNavigate } from "react-router-dom";
import "./address.css";
import countryList from "react-select-country-list";
import Select from "react-select";

const EditAddress = () => {
  let [adrress, setAddress] = useState([]);

  let [street, setStreet] = useState(null);
  let [city, setCity] = useState(null);
  let [pin_code, setPin_code] = useState(null);
  let [state, setState] = useState(null);
  let [country, setCountry] = useState(null);
  let [user_id, setUser_id] = useState(1);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  let id = window.location.pathname.substring(14, 15);
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setCountry(value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    axios
      .put(`/user/address/${id}/edit`, {
        id: id,
        street: street,
        city: city,
        pin_code: pin_code,
        state: state,
        country: country,
        user_id: user_id,
      })
      .then((res) => {
        navigate("/user/address");
      })
      .catch((err) => {
        navigate(`/user/address/${id}/edit`);
        setMessage(
          "Oppsie! Something went wrong. Please try entering valid datas"
        );
        navigate("/user/address/new");
      });
  };
  useEffect(() => {
    axios
      .get(`/user/address/${id}`)
      .then((response) => {
        setStreet(response.data.street);
        setCity(response.data.city);
        setPin_code(response.data.pin_code);
        setState(response.data.state);
        setCountry(response.data.country);
      })
      .catch((err) => {
        setMessage("Sorry we couldnot get address with error " + err);
      });
  }, []);

  return (
    <React.Fragment>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="container">
            <form className="forms-sample" onSubmit={submitHandler}>
              <h2>Update address :</h2>
              <br />
              <div className="form-group">
                <label htmlFor="exampleInputName1">Street</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName1"
                  placeholder={street}
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputName1">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName1"
                  placeholder={city}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputName1">pin_code</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName1"
                  placeholder={pin_code}
                  value={pin_code}
                  onChange={(e) => setPin_code(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputName1">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName1"
                  placeholder={state}
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <Select
                options={options}
                value={country}
                onChange={changeHandler}
              />
              <br />
              <button type="submit" className="btn btn-primary mr-2">
                Update address
              </button>
              <a href="/user/address" className="btn btn-light">
                Cancel
              </a>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditAddress;
