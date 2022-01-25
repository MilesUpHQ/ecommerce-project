import './login.css'
import axios from 'axios'
import React, { useEffect, Component } from 'react'
import {getJWT} from '../../utils/jwt';
import { useParams, useNavigate } from "react-router-dom";
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.change = this.change.bind(this)
        this.submit = this.submit.bind(this)
    }
    change(e) { 
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submit(e) {
        e.preventDefault();
        axios.post('http://localhost:4000/getToken', {
            email: this.state.email,
            password: this.state.password
        })
        .then(res => {
            console.log(res.data)
            localStorage.setItem('ecom_token', res.data.token)
            this.props.navigate('/')
        })
    }
    
    render() {
        return (
            <div className='container'>
                        <div className='card border-0 shadow rounded-3 my-5'>
                            <div className='card-body p-4 p-sm-5'>
                                <h1 className='card-title text-center mb-5 fw-light fs-5'>
                                    <span>Login</span>
                                </h1>
                                <form onSubmit={e=>this.submit(e)} id='form' className='form'>
                                    <div className='form-group'>
                                        <div className='form-floating mb-3'>
                                            <input id='floatingInput' type='email' onChange={e=>this.change(e)} value={this.state.email} required={true} className='form-control' name='email' id='email' placeholder='Email' />
                                            <lable htmlFor='floatingInput'>Email address</lable>
                                        </div>
                                        <div className='form-floating mb-3'>
                                            <input id='floatingPassword' name='password' type='password' onChange={e=>this.change(e)} value={this.state.password}  required={true} className='form-control' id='password' placeholder='Password' />
                                            <lable htmlFor='floatingPassword'>Password</lable>
                                        </div>
                                        <div className='form-group text-center'>
                                            <button type='submit' className='btn btn-primary btn-lg'>Login</button>
                                        </div>
                                    </div>
                                </form>
                                <div className='text-center'>
                                    <p>Don't have an account? <a href='/signup'>Sign up</a></p>
                                </div>
                        </div>
                </div>
            </div>
        )
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    useEffect(
        () => {
            if(getJWT()){
                navigate('/')
            }
        }
    )
    return <Login {...props} navigate={navigate} />
}
export default WithNavigate