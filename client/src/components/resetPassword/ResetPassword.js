import React from 'react';
import {useNavigate} from 'react-router';
import { useEffect, useState } from "react";
import '../resetPassword/resetPassword.css'
import axios from 'axios';

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentEmail, setCurrentEmail] = useState("nadigergangotri@gmail.com");

    const submitHandler = async (e) => {
        e.preventDefault();
        let token = window.location.pathname.substring(16);
        let decoded = parseJwt(token)
        // if(currentEmail == decoded.email){
            if(password == confirmPassword){
                axios.put('http://localhost:4000/reset_password',{
                    email:decoded.email,
                    password:password
                })
                .then((res) => {
                    alert("reset password successfull")
                }).catch(err => {
                    alert("reset password failed")
                })
            }else{
                alert("password do not patch ")
            }
        // }
    }
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <form className='form' onSubmit={submitHandler}>
                    <div className='form-group'>
                                <label htmlFor='password' >Password</label>
                                <input type='password' name='password' placeholder='Password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label htmlFor='confirmPassword' >confirmPassword</label>
                                <input type='password' name='confirmPassword' placeholder='confirmPassword' className='form-control' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </div>
                        <br />
                        <button type='submit' className='continue' >Continue</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;