import React, { useState } from "react";
import axios from 'axios'
export default function Signup() {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [userName,setUserName] = useState('');

    const [data, setData] = useState(null);

    const signup = () => {
        const data = {
            first_name: firstName,
            last_name: lastName,
            username: userName,
            email: email,
            password: password
        }
        console.log(data)
        axios.post('http://localhost:4000/signup', data)
            .then(res => {
                console.log(res)
                setData(res.data)
            })

    }
    return (
        <div className='container'>
                <div className='card border-0 shadow rounded-3 my-5'>
                    <div className='card-body p-4 p-sm-5'>
                        <h1 className='card-title text-center mb-5 fw-light fs-5'>
                            <span>Signup</span>
                        </h1>
                        <form className='form'>
                            <div className='form-group'>
                                <div className='form-floating mb-3'>
                                    <input id='floatingInput' required={true} type='text' onChange={(e)=>setFirstName(e.target.value)} className='form-control' id='first_name' placeholder='First Name' />
                                    <lable for='floatingInput'>First Name</lable>
                                </div>
                                <div className='form-floating mb-3'>
                                    <input id='floatingInput' required={true} type='text' onChange={(e)=>setLastName(e.target.value)} className='form-control' id='last_name' placeholder='Last Name' />
                                    <lable for='floatingInput'>Last Name</lable>
                                </div>
                                <div className='form-floating mb-3'>
                                    <input id='floatingInput' type='text' required={true} onChange={(e)=>setUserName(e.target.value)} className='form-control' id='username' placeholder='Username' />
                                    <lable for='floatingInput'>Username</lable>
                                </div>

                                <div className='form-floating mb-3'>
                                    <input id='floatingInput' type='email' required={true} onChange={(e)=>setEmail(e.target.value)} className='form-control' id='email' placeholder='Email' />
                                    <lable for='floatingInput'>Email address</lable>
                                </div>
                                <div className='form-floating mb-3'>
                                    <input id='floatingPassword' required={true} type='password' onChange={(e)=>setPassword(e.target.value)} className='form-control' id='password' placeholder='Password' />
                                    <lable for='floatingPassword'>Password</lable>
                                </div>
                                <div className='form-group text-center'>
                                    <button type='submit' onClick={signup} className='btn btn-primary btn-lg'>Sign Up</button>
                                </div>
                            </div>
                        </form>
                        <div className='text-center'>
                            <p>Already have an account? <a href='/login'>Login</a></p>
                        </div>
                </div>
        </div>
        </div>
    )
}

