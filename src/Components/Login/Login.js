import React, { Component } from 'react'
import axios from 'axios'
import './Login.css'
import url from '../../config.json'

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            emailIdError: '',
            password: '',
            passwordError: '',
            isValid: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value }, () => {
            console.log(this.state)
        });
    }
    handleSubmit(e) {
        e.preventDefault()
        
        this.validate().then((res)=>{
            console.log("res", res)
            if (res) {
                const user = {
                    email: this.state.emailId,
                    password: this.state.password
                };
                console.log(user)
    
                axios.post(`${url.url}/login`, user )
                    .then(res => {
                        console.log("Res.data inside role id", res.data.roleId)
                        if (res.status === 200 && res.data.status==="SUCCESS") {
                            this.props.history.push({
                                pathname: '/admindashboard',
                                search: '?query=dashboard',
                                //state:{data: response.data}
                                state: { data: res.data.roleId}
                            })
                        } else {
                            alert('Error in login')
                        }
                    })
    
            }
        }

        );  
    }
    validate() {
        console.log("Inside validate")
        let isValid = true;
        const errors = {
            accountNoError: '',
            passwordError: ''
        }

        if (this.state.emailId.indexOf('@')!== -1) {
            if (this.state.password.length > 4) {
                isValid = true;
            } else {
                isValid = false;
                errors.passwordError = 'password should be more than 4 characters'
            }
        } else {
            isValid = false;
            errors.emailIdError = 'Email Id should be in proper format'
        }
        
        this.setState({
            ...this.state,
            ...errors
        })
        console.log("isValid inside validate",isValid)
        return Promise.resolve(isValid);

    }
    render() {
        return (
            <div>
                <header >
                    <h1>Login </h1>
                </header>
                <form className="loginform">
                    <div className="form-group">
                        <span className="pull-right text-danger"><small>{this.state.emailIdError}</small></span>
                        <br></br>
                        <label htmlFor="emailId">Email ID </label>
                        <input
                            type="text"
                            id="emailId"
                            onChange={this.handleChange}
                            value={this.state.emailId}
                            className="form-control"
                            placeholder="Enter the email" />
                    </div>
                    <div className="form-group">
                        <span className="pull-right text-danger"><small>{this.state.passwordError}</small></span>
                        <br></br>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                            className="form-control"
                            placeholder="Enter the password" />
                    </div>
                    <br></br><br></br>
                    <button id="submit" type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Login</button>

                </form>
            </div>
        )
    }
}

export default Login
