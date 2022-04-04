import React from "react";
import axios from "../../utils/ajax-helper";
import { useNavigate } from "react-router-dom";
import "./address.css";
import { getJWT } from "../../utils/jwt";
import { parseJwt } from "../../utils/jwt";
import Select from "react-select";
import { useEffect, useState, useMemo } from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import countryList from "react-select-country-list";

const AddressForm = ({ title, register, handleSubmit, errorMessage }) => {
  const {
    formState: { errors },
  } = useForm();
  const options = useMemo(() => countryList().getData(), []);
  let [country, setCountry] = useState(null);
  let changeHandler;
  changeHandler = (value) => {
    setCountry(value);
  };
  let [isCountry, SetIsCountry] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  let decoded = parseJwt(getJWT());
  let [user_id, setUser_id] = useState(decoded.id);
  const [message, setMessage] = useState(null);
  const [newAddressUrl, setNewAddressUrl] = useState("/user/address/new");
  let id = location.pathname.slice(14);

  useEffect(() => {
    // if (!(location.pathname == newAddressUrl)) {
    //   axios
    //     .get(`/user/address/${id}/getById`)
    //     .then((response) => {
    //       setStreet(response.data.street);
    //       setCity(response.data.city);
    //       setPin_code(response.data.pin_code);
    //       setState(response.data.state);
    //       setCountry(response.data.country);
    //       setPhone(response.data.phone);
    //       setName(response.data.name);
    //       setEmail(response.data.email);
    //       setTitle("Address Edit:");
    //       SetIsCountry(true);
    //     })
    //     .catch((err) => {
    //       setMessage("Sorry we couldnot get address with error " + err);
    //     });
    // }
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("/user/new/address/", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        street: data.street,
        city: data.city,
        pin_code: data.pin_code,
        state: data.state,
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
        navigate(newAddressUrl);
      });
  };

  if (!(location.pathname == newAddressUrl)) {
    onSubmit = async (e, data) => {
      e.preventDefault();
      axios
        .put(`/user/address/${id}/edit`, {
          id: id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          street: data.street,
          city: data.city,
          pin_code: data.pin_code,
          state: data.state,
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
  return (
    <>
      <React.Fragment>
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="container">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Field>
                  <label>First Name : </label>
                  <br />
                  <input
                    className="inputClass"
                    placeholder="Name"
                    type="text"
                    {...register("name", {
                      required: true,
                      maxLength: 10,
                      minLength: 3,
                    })}
                  />
                </Form.Field>
                <br />
                {errors.name && <p>Please check the Name</p>}
                <Form.Field>
                  <label>Email : </label>
                  <br />
                  <input
                    className="inputClass"
                    placeholder="Email"
                    type="email"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                  />
                </Form.Field>
                <br />
                {errors.email && <p>Please check the email</p>}
                <Form.Field>
                  <label>Phone Number : </label>
                  <br />
                  <input
                    className="inputClass"
                    placeholder="Phone Number"
                    type="text"
                    {...register("phone", {
                      required: true,
                      maxLength: 10,
                      minLength: 10,
                      valueAsNumber: true,
                      pattern: {
                        value: /^[0-9]+$/,
                      },
                    })}
                  />
                </Form.Field>
                <br />
                {errors.phone && <p>Please check the phone number</p>}
                <Form.Field>
                  <label>Street : </label>
                  <br />
                  <input
                    className="inputClass"
                    placeholder="street"
                    type="text"
                    {...register("street", {
                      required: true,
                    })}
                  />
                </Form.Field>
                <br />
                {errors.street && <p>Please check the street</p>}
                <Form.Field>
                  <label>city : </label>
                  <br />
                  <input
                    className="inputClass"
                    placeholder="city"
                    type="text"
                    {...register("city", {
                      required: true,
                    })}
                  />
                </Form.Field>
                <br />
                {errors.city && <p>Please check the city</p>}
                <Form.Field>
                  <label>Pic code : </label>
                  <br />
                  <input
                    className="inputClass"
                    placeholder="pin code"
                    type="text"
                    {...register("pin_code", {
                      required: true,
                      valueAsNumber: true,
                      pattern: {
                        value: /^[0-9]+$/,
                      },
                    })}
                  />
                </Form.Field>
                <br />
                {errors.phone && <p>Please check the phone number</p>}
                <Form.Field>
                  <label>State : </label>
                  <br />
                  <input
                    className="inputClass"
                    placeholder="state"
                    type="text"
                    {...register("state", {
                      required: true,
                    })}
                  />
                </Form.Field>
                <br />
                {errors.city && <p>Please check the state</p>}

                {isCountry == true && (
                  <div>
                    <p>Country</p>
                    <div className="countryDiv">
                      <p className="countryP">{country}</p>
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
                    <label htmlFor="exampleInputName1">Country: </label>
                    <br />
                    <Select
                      options={options}
                      value={country}
                      onChange={changeHandler}
                    />
                  </div>
                )}
                <br />
                <Button type="submit" className="btn btn-primary mr-2">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </React.Fragment>
    </>
  );
};

export default AddressForm;
