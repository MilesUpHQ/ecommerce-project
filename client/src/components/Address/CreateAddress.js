import React from "react";
import { useEffect, useState, useMemo } from "react";
import axios from "../../utils/ajax-helper";
import { useNavigate } from "react-router-dom";
import "./address.css";
import { getJWT } from "../../utils/jwt";
import { parseJwt } from "../../utils/jwt";
import countryList from "react-select-country-list";
import Select from "react-select";
import AddressForm from "./AddressForm";
import { useLocation } from "react-router-dom";

const CreateAddress = () => {
  let [street, setStreet] = useState(null);
  let [city, setCity] = useState(null);
  let [pin_code, setPin_code] = useState(null);
  let [state, setState] = useState(null);
  let [country, setCountry] = useState(null);
  let [title, setTitle] = useState("null");
  let [name, setName] = useState(null);
  let [email, setEmail] = useState(null);
  let [phone, setPhone] = useState(null);
  let decoded = parseJwt(getJWT());
  let [user_id, setUser_id] = useState(decoded.id);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const options = useMemo(() => countryList().getData(), []);
  let changeHandler;
  changeHandler = (value) => {
    setCountry(value);
  };
  let submitHandler;
  let id = location.pathname.slice(14);
  if (location.pathname == "/user/address/null") {
    // setTitle("Add an address");
    submitHandler = async (e) => {
      e.preventDefault();
      axios
        .post("/user/new/address/", {
          name: name,
          email: email,
          phone: phone,
          street: street,
          city: city,
          pin_code: pin_code,
          state: state,
          country: country.label,
          user_id: user_id,
        })
        .then((res) => {
          navigate("/user/address");
        })
        .catch((err) => {
          setMessage(
            "Oppsie! Something went wrong. Please try entering valid datas"
          );
          navigate("/user/address/null");
        });
    };
  }
  if (!(location.pathname == "/user/address/null")) {
    submitHandler = async (e) => {
      e.preventDefault();
      axios
        .put(`/user/address/${id}/edit`, {
          id: id,
          name: name,
          email: email,
          phone: phone,
          street: street,
          city: city,
          pin_code: pin_code,
          state: state,
          country: country.label,
          user_id: user_id,
        })
        .then((res) => {
          navigate("/user/address");
        })
        .catch((err) => {
          navigate(`/user/address/${id}`);
          setMessage(
            "Oppsie! Something went wrong. Please try entering valid datas"
          );
        });
    };
  }

  useEffect(() => {
    if (!(location.pathname == "/user/address/null")) {
      axios
        .get(`/user/address/${id}/getById`)
        .then((response) => {
          setStreet(response.data.street);
          setCity(response.data.city);
          setPin_code(response.data.pin_code);
          setState(response.data.state);
          setCountry(response.data.country);
          setPhone(response.data.phone);
          setName(response.data.name);
          setEmail(response.data.email);
          setTitle("Address :");
        })
        .catch((err) => {
          setMessage("Sorry we couldnot get address with error " + err);
        });
    }
  }, []);

  return (
    <div>
      {message && <h2>{message}</h2>}
      {options && (
        <AddressForm
          street={street}
          setStreet={setStreet}
          city={city}
          setCity={setCity}
          pin_code={pin_code}
          setPin_code={setPin_code}
          state={state}
          setState={setState}
          country={country}
          options={options}
          changeHandler={changeHandler}
          submitHandler={submitHandler}
          title={title}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
        />
      )}
    </div>
  );
};

export default CreateAddress;
