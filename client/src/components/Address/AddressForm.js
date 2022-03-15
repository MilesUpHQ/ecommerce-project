import React from "react";
import countryList from "react-select-country-list";
import Select from "react-select";
import { useEffect, useState, useMemo } from "react";
import ErrorAlert from "../Common/ErrorAlert";

const AddressForm = ({
  street,
  setStreet,
  city,
  setCity,
  state,
  setState,
  pin_code,
  setPin_code,
  submitHandler,
  country,
  options,
  changeHandler,
  title,
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  errorMessage,
  isCountry,
  SetIsCountry,
}) => {
  return (
    <>
      <React.Fragment>
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="container">
              <form className="forms-sample" onSubmit={submitHandler}>
                <h2>{title}</h2>
                <br />
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <sup>*</sup>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <sup>*</sup>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <sup>*</sup>
                  <input
                    type="number"
                    pattern="[0-9]{10}"
                    className="form-control"
                    id="phone"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="street">Street</label>
                  <sup>*</sup>
                  <input
                    type="text"
                    className="form-control"
                    id="street"
                    placeholder="Street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <sup>*</sup>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pincode">Pincode</label>
                  <sup>*</sup>
                  <input
                    type="text"
                    className="form-control"
                    id="pincode"
                    placeholder="pin_code"
                    value={pin_code}
                    onChange={(e) => setPin_code(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <sup>*</sup>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    placeholder="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                {isCountry == true && (
                  <div>
                    <p>Country</p>
                    <div
                      style={{
                        width: "500px",
                        height: "50px",
                        border: "solid 1px black",
                        backgroundColor: "white",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ marginLeft: "25%", marginTop: "5px" }}>
                        {country}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary btn-icon-text mt-1 "
                      onClick={() => SetIsCountry(false)}
                    >
                      Edit Country
                    </button>
                  </div>
                )}
                {isCountry == false && (
                  <div>
                    <label htmlFor="exampleInputName1">Country</label>
                    <Select
                      options={options}
                      value={country}
                      onChange={changeHandler}
                    />
                  </div>
                )}
                <br />
                {errorMessage && <ErrorAlert msg={errorMessage} />}
                <button type="submit" className="btn btn-primary mr-2">
                  Submit
                </button>
                <a href="/user/address" className="btn btn-light">
                  Cancel
                </a>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    </>
  );
};

export default AddressForm;
