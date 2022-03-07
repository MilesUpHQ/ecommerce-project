import React from "react";
import countryList from "react-select-country-list";
import Select from "react-select";
import { useEffect, useState, useMemo } from "react";

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
                  <label htmlFor="exampleInputName1">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="Name"
                    value={name}
                    required={true}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="exampleInputName1">E-mail</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="E-mail"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="exampleInputName1">Phone Number</label>
                  <input
                    type="number"
                    pattern="[0-9]{10}"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="Phone Number"
                    value={phone}
                    required={true}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="exampleInputName1">Street</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="Street"
                    value={street}
                    required={true}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputName1">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="city"
                    value={city}
                    required={true}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputName1">Pincode</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="pin_code"
                    value={pin_code}
                    required={true}
                    onChange={(e) => setPin_code(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputName1">State</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="state"
                    value={state}
                    required={true}
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
