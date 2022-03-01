import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  ButtonGroup,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "../../utils/ajax-helper";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./address.css";
import { getJWT } from "../../utils/jwt";
import { parseJwt } from "../../utils/jwt";
function loadRazorPay(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Address = () => {
  let [addresses, setAddress] = useState([]);
  let [address_id, setAddress_id] = useState(null);
  const [message, setMessage] = useState(null);
  let decoded = parseJwt(getJWT());
  let [user_id, setUser_id] = useState(decoded.id);
  const navigate = useNavigate();
  let [response, setResponse] = useState(null);
  let [name, setName] = useState(null);
  let [email, setEmail] = useState(null);
  let [phone, setPhone] = useState(null);

  useEffect(() => {
    axios
      .post("/user/checkout/razorpay/")
      .then((res) => {
        setResponse(res.data);
        console.log("res : ", res);
        console.log("response : ", response);
      })
      .catch((err) => {
        console.log("err :", err);
      });

    axios
      .get(`/user/address/get/${user_id}`)
      .then((res) => {
        if (res.data.length == 0) {
          setMessage("No address found!! Please add new one");
        } else {
          setAddress(res.data);
          setAddress_id(res.data[0].id);
          try {
            getById(res.data[0].id);
          } catch (error) {
            console.log("err :", error);
          }
          document.getElementById(res.data[0].id).style.border =
            "solid 2px blue";
        }
      })
      .catch((err) => {
        setMessage("Sorry! Something went wrong. Please Try again", err);
      });
  }, []);
  const displayRazorPay = async () => {
    const res = await loadRazorPay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("something went wrong ! cant load razor pay,Check internet");
      return;
    }
    var options = {
      key: process.env.RAZOR_PAY_KEY,
      amount: response.amount.toString(),
      currency: response.currency,
      name: "E-commerence",
      description: "Transaction for placing an order",
      order_id: response.id,
      handler: function (response) {
        alert("successfull");
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },

      prefill: {
        name: name,
        email: email,
        contact: phone,
      },
    };
    var paymentObj = new window.Razorpay(options);
    paymentObj.open();
    paymentObj.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
  };

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   displayRazorPay();
  // };

  const getById = (id) => {
    axios
      .get(`/user/address/${id}/getById`)
      .then((res) => {
        console.log("res :", res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone);
      })
      .catch((err) => {
        console.log("err :", err);
      });
  };
  // ****************************delete address********************//
  const handleDelete = (id) => {
    if (window.confirm(`Are you sure! want to delete selected address?`)) {
      axios
        .delete(`/user/address/${id}/delete`)
        .then((res) => {
          let newAddress = [...addresses];
          newAddress = newAddress.filter((address) => address.id !== id);
          setAddress(newAddress);
          setMessage("Delete successfull!!!!!!!");
          setTimeout(() => {
            setMessage(null);
          }, 6000);
        })
        .catch((err) => {
          setMessage("Sorry! You can't delete this address");
          setTimeout(() => {
            setMessage(null);
          }, 6000);
        });
    }
  };

  // ***********on select *****************//
  const clicked = (id) => {
    console.log("event target :", id);
    try {
      getById(id);
    } catch (error) {
      console.log("err :", error);
    }

    setAddress_id(id);
    document.getElementById(id).style.border = "solid 2px blue";
    for (let i = 0; i < addresses.length; i++) {
      if (id != addresses[i].id) {
        document.getElementById(addresses[i].id).style.border = "none";
      }
    }
  };

  // ********************on check out ***************/
  const onCheckOut = (address_id) => {
    navigate(`/checkout/${address_id}`);
  };

  return (
    <React.Fragment>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="container">
            <a
              href="/user/address/null"
              id="newAddress"
              className="btn btn-dark rounded-pill py-2 btn-block "
            >
              New Address
            </a>
            {addresses.length > 0 && <h2>select an address :</h2>}
            <br />
            <div>
              {message && <h3>{message}</h3>}
              <Container>
                <Row>
                  {addresses &&
                    addresses.map((address) => (
                      <Col className="addressCol">
                        <Card
                          id={address.id}
                          className="addressCard"
                          onClick={() => clicked(address.id)}
                        >
                          <Card.Text className="bolderText">
                            {address.name}
                          </Card.Text>
                          <Card.Text className="bolderText">
                            {address.email}
                          </Card.Text>
                          <Card.Text className="bolderText">
                            {address.phone}
                          </Card.Text>
                          <Card.Text>{address.street}</Card.Text>
                          <Card.Text className="bolderText">
                            {address.city} - {address.pin_code}
                          </Card.Text>
                          <Card.Text>{address.state}</Card.Text>
                          <Card.Text>{address.country}</Card.Text>
                          <ButtonGroup
                            className="me-2"
                            aria-label="First group"
                          >
                            <Button variant="light">
                              {" "}
                              <a href={`/user/address/${address.id}`}>
                                <BiEdit />
                              </a>
                            </Button>{" "}
                            <Button
                              variant="light"
                              onClick={() => handleDelete(address.id)}
                            >
                              {" "}
                              <MdDeleteOutline />
                            </Button>
                          </ButtonGroup>
                        </Card>
                      </Col>
                    ))}
                  {response && addresses.length > 0 && (
                    // <button
                    //   className="btn btn-dark rounded-pill py-2 btn-block"
                    //   id="checkOut"
                    //   onClick={() => onCheckOut(address_id)}
                    // >
                    //   Check out
                    // </button>
                    // {response && (
                    <button
                      onClick={displayRazorPay}
                      className="btn btn-primary mr-2"
                    >
                      Pay {response.amount / 100}
                    </button>
                    // )}
                  )}
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Address;
