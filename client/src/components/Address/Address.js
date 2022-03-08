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

const Address = () => {
  let [addresses, setAddress] = useState([]);
  let [address_id, setAddress_id] = useState(null);
  const [message, setMessage] = useState(null);
  let decoded = parseJwt(getJWT());
  let [user_id, setUser_id] = useState(decoded.id);
  const navigate = useNavigate();
  let [razor, setRazor] = useState(null);
  let [name, setName] = useState(null);
  let [email, setEmail] = useState(null);
  let [phone, setPhone] = useState(null);

  const nullMessage = () => {
    return setTimeout(() => {
      setMessage(null);
    }, 6000);
  };

  useEffect(() => {
    axios
      .post(`/user/checkout/payment/${user_id}`)
      .then((res) => {
        setRazor(res.data);
      })
      .catch((err) => {
        setMessage("error in razor pay");
        nullMessage();
      });

    axios
      .get(`/user/address/get/${user_id}`)
      .then((res) => {
        if (res.data.length == 0) {
          setMessage("No address found!! Please add new one");
          nullMessage();
        } else {
          setAddress(res.data);
          setAddress_id(res.data[0].id);
          try {
            getById(res.data[0].id);
          } catch (error) {
            setMessage("error in getting address");
            nullMessage();
          }
          document.getElementById(res.data[0].id).style.border =
            "solid 2px blue";
        }
      })
      .catch((err) => {
        setMessage("Sorry! Something went wrong. Please Try again", err);
        nullMessage();
      });
  }, []);
  const displayRazorPay = async () => {
    var options = {
      key: process.env.RAZOR_PAY_KEY,
      amount: razor.amount.toString(),
      currency: razor.currency,
      name: "E-commerence",
      description: "Transaction for placing an order",
      order_id: razor.id,
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
    setMessage("error in openin razor pay");
    nullMessage();
    navigate("/order/error");
  }
  function onPaymentSuccess(response) {
    setMessage("opening razorpay");
    nullMessage();
    try {
      orderPlaced(response.razorpay_order_id, response.razorpay_payment_id);
    } catch (error) {
      setMessage("error in placing order");
      nullMessage();
      navigate("/order/error");
    }
  }
  const orderPlaced = async (order_id, payment_id) => {
    let ordersID;
    axios
      .post("/user/order/confirm/", {
        order_id: order_id,
        order_date: new Date(),
        total_price: razor.amount / 100,
        status: "confirmed",
        address_id: address_id,
        user_id: user_id,
      })
      .then((res) => {
        ordersID = res.data.id;
        axios
          .post("/user/order/payment/", {
            order_id: res.data.id,
            type: "card",
            status: "confirmed",
            payment_id: payment_id,
          })
          .then((res) => {
            axios
              .get(`/user/cart/${user_id}/details`)
              .then((res) => {
                let cart_id = res.data.id;
                let quantity = res.data.quantity;
                let variant_id = res.data.variant_id;
                axios
                  .post("/user/order/items/", {
                    quantity: quantity,
                    variant_id: variant_id,
                    order_id: ordersID,
                  })
                  .then(async (res) => {
                    if (
                      res.data.message === "Sucessfully added order items!!"
                    ) {
                      setMessage("sucessfully placed order ");
                      nullMessage();
                      try {
                        await deleteCart(cart_id);
                        navigate("/order/confirm");
                      } catch (error) {}
                    } else {
                      setMessage("error in adding order items");
                      nullMessage();
                      navigate("/order/error");
                    }
                  })
                  .catch((err) => {
                    setMessage("error in adding order items");
                    nullMessage();
                    navigate("/order/error");
                  });
              })
              .catch((err) => {
                setMessage("error in getting cart details");
                nullMessage();
              });
          })
          .catch((err) => {
            setMessage("error in payment");
            nullMessage();
            navigate("/order/error");
          });
      })
      .catch((err) => {
        setMessage("error in placing order");
        nullMessage();
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
        nullMessage();
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
          nullMessage();
        })
        .catch((err) => {
          setMessage("Sorry! You can't delete this address");
          nullMessage();
        });
    }
  };
  // **********************delete cart************************//
  const deleteCart = (cart_id) => {
    axios
      .delete(`/cart/${cart_id}/delete`)
      .then((res) => {
        setMessage("Empty cart");
      })
      .catch((err) => {
        setMessage("could not empty cart");
      });
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
                  {razor && addresses.length > 0 && (
                    <button
                      onClick={displayRazorPay}
                      className="btn btn-primary mr-2"
                    >
                      Pay {razor.amount / 100}
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
