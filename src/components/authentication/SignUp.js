import React from 'react'
import './authenticate.css'

const SignUp = () => {
    return (
        <form className="authenticate">
            <div className="input-field">
                <i className="material-icons prefix blue-text text-darken-2">person</i>
                <input id="new-user" type="text" autoComplete="off" />
                <label htmlFor="new-user">Enter Your Name</label>
            </div>
            <div className="input-field">
                <i className="material-icons prefix blue-text text-darken-2">mail</i>
                <input id="email" type="text" autoComplete="off" />
                <label htmlFor="email">Create A Email Address</label>
            </div>
            <div className="input-field">
                <i className="material-icons prefix blue-text text-darken-2">lock</i>
                <input name="new-password" type="password" autoComplete="off" />
                <label htmlFor="new-password">Enter A Password</label>
            </div>
            <div className="input-field">
                <i className="material-icons prefix blue-text text-darken-2">phone</i>
                <input id="phone-number" type="number" autoComplete="off" />
                <label htmlFor="phone-number">Enter A Contact Number</label>
            </div>
            <button type="submit" className="btn blue darken-2 z-depth-2">
                <span>Sign Up</span>
                <i className="material-icons right">login</i>
            </button>
        </form>
    )
}

export default SignUp
