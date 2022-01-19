import React from 'react';
import '../forgotPassword/forgotPassword.css';
import { useEffect, useState } from "react";
import axios from 'axios';


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [currentEmail, setCurrentEmail] = useState("nadigergangotri@gmail.com");


    const submitHandler = async (e) => {
        e.preventDefault();
        if (email == '') {
            alert("Please enter E-mail")
        } else {
            axios.post('http://localhost:4000/forgot_password', { email: email }).then((res) => {
                alert("Please check your inbox , we have sent an email!!")
            }).catch((err) => {
                alert("Sorry!! we could not send an email")
            })
        }
    }

    return (
        <div>
            <div className="card">
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
    )
}

export default ForgotPassword;