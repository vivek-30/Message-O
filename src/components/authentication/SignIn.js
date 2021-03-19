import React, { useState } from 'react'
import TakeInput from '../main/TakeInput'
import './authenticate.css'

const SignIn = () => {

    const [ user, setUser ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleChange = (e) => {
        const { id, value } = e.target
        id === 'user-name' ? setUser(value) : id ===  'password' ? setPassword(value) : null
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(`user = ${user} password = ${password}`)
        setUser('')
        setPassword('')
    }

    return (
        <form className="authenticate" onSubmit={handleSubmit}>
            <TakeInput 
                iconName="person" 
                labelText="Enter Your Username"
                options={{
                    id: "user-name", 
                    type: 'text',
                    handleChange,
                    value: user
                }}
            />

            <TakeInput 
                iconName="lock"  
                labelText="Enter Your Password"
                options={{
                    id: "password", 
                    type: 'password',
                    handleChange,
                    value: password
                }}
            />

            <button type="submit" className="btn blue darken-2 z-depth-2">
                <span>Sign In</span>
                <i className="material-icons right">login</i>
            </button>
        </form>
    )
}

export default SignIn
