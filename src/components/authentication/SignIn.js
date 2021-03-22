import React, { useState } from 'react'
import TakeInput from '../main/TakeInput'
import { makePostRequest } from '../../client/helperFunctions'
import './authenticate.css'

const SignIn = () => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleChange = (e) => {
        const { id, value } = e.target
        id === 'user-email' ? setEmail(value) : id ===  'password' ? setPassword(value) : null
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(`user = ${user} password = ${password}`)
        const data = {
            email,
            password
        }
        const result = makePostRequest('http://127.0.0.1:4000/sign-in', data)
        console.log('result', result)

        setEmail('')
        setPassword('')
    }

    return (
        <form className="authenticate" onSubmit={handleSubmit}>
            <h4 className="blue-text text-darken-2">Sign In</h4>
            <TakeInput 
                iconName="mail" 
                labelText="Enter Your Email"
                options={{
                    id: "user-email", 
                    type: 'email',
                    handleChange,
                    value: email
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
