import React from 'react'
import './auth.css'

const SignIn = () => {

    var User = ''

    const handleChange = (e) => {
        let value = e.target.value
        if(e.target.name === 'username'){
            User = value
        }
    }
    return (
        <form className="auth" onSubmit={(e) => e.preventDefault()}>
            <div className="input-field">
                <i className="material-icons prefix blue-text text-darken-2">person</i>
                <input id="username" type="text" autoComplete="off" onChange={handleChange} value={User} />
                <label htmlFor="username">Enter Your Username</label>
            </div>
            <div className="input-field">
                <i className="material-icons prefix blue-text text-darken-2">lock</i>
                <input id="password" type="password" autoComplete="off" />
                <label htmlFor="password">Enter Your Password</label>
            </div>
            <button type="submit" className="btn blue darken-2 z-depth-2">
                <span>Sign In</span>
                <i className="material-icons right">login</i>
            </button>
        </form>
    )
}

export default SignIn
