import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav>
            <div className="nav-wrapper">
                <NavLink to="/" className="brand-logo left">Chat App</NavLink>
                <ul className="right">
                    <li><Link to="/SignIn">Sign In</Link></li>
                    <li><Link to="/SignUp">Sign Up</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
