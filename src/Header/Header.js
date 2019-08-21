import React, { Component } from 'react';
import INGlogo from '../Assets/Images/Logo.jfif'
import './Header.css'

export class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false
        }
        
    }

 render() {
        return (
            <div>
                {
                    this.props.loggedIn ? (
                        <div className="header">
                            <img className="INGLogo" src={INGlogo} alt="ING Logo" />
                            {/* <a className="login" href="/#/logout">Logout</a> */}
                        </div>
                    ) :
                        (
                            <div className="header">
                                <img className="INGLogo" src={INGlogo} alt="ING Logo" />
                                {/* <a className="login" href="/#/login">Login</a> */}
                            </div>
                        )
                }
            </div>

        )
    }
}

export default Header;