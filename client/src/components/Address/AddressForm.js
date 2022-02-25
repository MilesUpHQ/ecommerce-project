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
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputName1">pin_code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="pin_code"
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
                    placeholder="state"
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
                  Submit
                </button>
                <button className="btn btn-light">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    </>
  );
};

export default AddressForm;
