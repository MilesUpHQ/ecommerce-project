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
import { Razorpay } from "razorpay-checkout";
import SimpleNavBar from "../SimpleNavBar/SimpleNavBar";
import { clearMessageTimeout } from "../../utils/clearMessageTimeout";

const Address = () => {
  let [addresses, setAddress] = useState([]);
  let [address_id, setAddress_id] = useState(null);
  const [message, setMessage] = useState(null);
  let decoded = parseJwt(getJWT());
  let [user_id, setUser_id] = useState(decoded.id);
  const navigate = useNavigate();
  let [payMode, setPayMode] = useState(null);
  let [name, setName] = useState(null);
  let [email, setEmail] = useState(null);
  let [phone, setPhone] = useState(null);
  let [order_id, setOrder_id] = useState(null);

  useEffect(() => {
    axios
      .post(`/user/checkout/payment/${user_id}`)
      .then((res) => {
        setPayMode(res.data);
        setOrder_id(res.data.order_id);
      })
      .catch((err) => {
        setMessage("error in payMode pay");
        clearMessageTimeout(setMessage);
      });

    axios
      .get(`/user/address/get/${user_id}`)
      .then((res) => {
        if (res.data.length == 0) {
          setMessage("No address found!! Please add new one");
          clearMessageTimeout(setMessage);
        } else {
          setAddress(res.data);
          setAddress_id(res.data[0].id);
          try {
            getById(res.data[0].id);
          } catch (error) {
            setMessage("error in getting address");
            clearMessageTimeout(setMessage);
          }
          document.getElementById(res.data[0].id).style.border =
            "solid 2px blue";
        }
      })
      .catch((err) => {
        setMessage("Sorry! Something went wrong. Please Try again", err);
        clearMessageTimeout(setMessage);
      });
  }, []);

  const displayRazorPay = async () => {
    var options = {
      key: process.env.RAZOR_PAY_KEY,
      amount: payMode.amount.toString(),
      currency: payMode.currency,
      name: "E-commerence",
      description: "Transaction for placing an order",
      order_id: payMode.razor_order_id,
      handler: (response) => onPaymentSuccess(response),
      prefill: {
        name: name,
        email: email,
        contact: phone,
      },
    };

    var paymentObj = new Razorpay(options);
    paymentObj.open();
    paymentObj.on("payment.failed", (errResponse) =>
      onPaymentFailure(errResponse)
    );
  };
  function onPaymentFailure(response) {
    setMessage("error in openin payMode pay");
    clearMessageTimeout(setMessage);
    navigate("/order/error");
  }
  function onPaymentSuccess(response) {
    setMessage("opening razorpay", response.razorpay_order_id);
    clearMessageTimeout(setMessage);
    orderPlaced(response.razorpay_order_id, response.razorpay_payment_id);
  }

  const orderPlaced = async (payment_gateway_id, payment_id) => {
    console.log("payment_gateway_id :", payment_gateway_id);
    axios
      .put(`/user/order/confirm/${order_id}`, {
        id: order_id,
        payment_gateway_id: payment_gateway_id,
        payment_id: payment_id,
        user_id: user_id,
        address_id: address_id,
      })
      .then((res) => {
        console.log("res :", res);
        navigate(`/order/confirm/${order_id}`);
      })
      .catch((err) => {
        console.log("err :", err);
        navigate("/order/error");
      });
  };

  const getById = (id) => {
    axios
      .get(`/user/address/${id}/getById`)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone);
      })
      .catch((err) => {
        setMessage("error in getting address by id");
        clearMessageTimeout(setMessage);
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
          clearMessageTimeout(setMessage);
        })
        .catch((err) => {
          setMessage("Sorry! You can't delete this address");
          clearMessageTimeout(setMessage);
        });
    }
  };
  // ***********on select *****************//
  const clicked = (id) => {
    try {
      getById(id);
    } catch (error) {}
    setAddress_id(id);
    document.getElementById(id).style.border = "solid 2px blue";
    for (let i = 0; i < addresses.length; i++) {
      if (id != addresses[i].id) {
        document.getElementById(addresses[i].id).style.border = "none";
      }
    }
  };

  return (
    <React.Fragment>
      <SimpleNavBar />
      <div className="main-div">
        <div className="content-wrapper">
          <div className="container">
            <a
              href="/user/address/new"
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
                      <Col className="addressCol" key={address.id}>
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
                  {payMode && addresses.length > 0 && (
                    <button
                      onClick={displayRazorPay}
                      className="btn btn-primary mr-2"
                    >
                      Pay {payMode.amount / 100}
                    </button>
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
