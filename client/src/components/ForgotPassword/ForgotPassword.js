import React from 'react';
import '../ResetPassword/resetPassword.css';
import { useEffect, useState } from "react";
import axios from '../../utils/ajax-helper';



const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [currentEmail, setCurrentEmail] = useState("");
    const [message, setMessage] = useState('')



    const submitHandler = async (e) => {
        e.preventDefault();
        let currentPort = window.location.href;
        if (email == '') {
            setMessage("Please enter E-mail")
            setTimeout(() => {
                setMessage(null);
            }, 2000);
        } else {
            console.log("jfghbvfdhvfhx")
            axios.post('/forgot_password', { email: email, link: currentPort.slice(0, 21) }).then((res) => {
                console.log("res", res)
                setMessage("Please check your inbox , we have sent an email!!")
                setTimeout(() => {
                    setMessage(null);
                }, 2000);
            }).catch((err) => {
                console.log("err ", err)
                setMessage("Sorry!! we could not send an email")
                setTimeout(() => {
                    setMessage(null);
                }, 2000);
            })
        }
    }

    return (
        <div>
<div style={{background:'#fcf0e2',height:"1000px"}}> 
            <nav className="navbar navbar-expand-lg ">
  <a className="navbar-brand" href="#"><img src='https://images.indianexpress.com/2021/01/myntra.png' height='50px' width='150px' />
</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="#">Men</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Women</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Kids</a>
      </li>
    
    </ul>
  </div>
</nav>
            <div className="card">
                <div className="card-header">
                    <img src='https://images.indianexpress.com/2021/01/myntra.png' height='100px' width='100px' />
                    <br />
                    <h4 className='message'>
                        {message}
                    </h4>
                </div>
                <div className="card-body">
                    <form className='form' onSubmit={submitHandler}>
                        <div className='form-group'>
                            <label htmlFor='email' >E-mail</label>
                            <input type='email' name='email' placeholder='E-mail' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <br />
                        <button type='submit' className='continue' >Continue</button>
                    </form>
                </div>
            </div>
            </div>
        </div>

    )
}

export default ForgotPassword;