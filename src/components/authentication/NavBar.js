import React, { useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import M from 'materialize-css'

const NavBar = () => {

    const sideNavRef = useRef()

    useEffect(() => {
        sideNavRef.current ? M.Sidenav.init(sideNavRef.current) : null
    }, [])

    return (
            <>
            <nav>
                <div className="nav-wrapper">
                    <NavLink to="/" className="brand-logo">MessageO</NavLink>
                    <Link to="#" data-target="mobile-nav" className="sidenav-trigger left"><i className="material-icons">menu</i></Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to="/SignIn">Sign In</Link></li>
                        <li><Link to="/SignUp">Sign Up</Link></li>
                    </ul>
                </div>
            </nav>
            <ul ref={sideNavRef} className="sidenav blue-grey lighten-5" id="mobile-nav">
                <li><Link to="/SignIn">Sign In</Link></li>
                <li><Link to="/SignUp">Sign Up</Link></li>
            </ul>
        </>
    )
}

export default NavBar
