import React, { useState } from 'react'
import TakeInput from '../main/TakeInput'
import './authenticate.css'

const SignUp = () => {

    const [ user, setUser ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ contact, setContact ] = useState('')

    const handleChange = (e) => {
        const { id, value } = e.target
        id === 'new-user' ? setUser(value) : id ===  'new-password' ? setPassword(value) : id === 'telephone' ? setContact(value) : id === 'email' ? setEmail(value) : null
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(`user = ${user} password = ${password} email = ${email} contact = ${contact}`)
        setUser('')
        setPassword('')
        setEmail('')
        setContact('')
    }

    return (
        <form className="authenticate" onSubmit={handleSubmit}>
            <h4 className="blue-text text-darken-2">Sign Up</h4>
            <TakeInput 
                iconName="person"  
                labelText="Enter Your Name"
                options={{
                    id: "new-user", 
                    type: 'text',
                    handleChange,
                    value: user
                }}
            />
            
            <TakeInput 
                iconName="mail"  
                labelText="Create A Email Address"
                options={{
                    id: "email", 
                    type: 'email',
                    handleChange,
                    value: email
                }}
            />

            <TakeInput 
                iconName="lock"  
                labelText="Create A Password"
                options={{
                    id: "new-password", 
                    type: 'password',
                    handleChange,
                    value: password
                }}
            />

            <TakeInput 
                iconName="phone"  
                labelText="Enter Your Contact Number"
                options={{
                    id: "telephone", 
                    type: 'tel',
                    handleChange,
                    value: contact
                }}
            />
            
            <button type="submit" className="btn blue darken-2 z-depth-2">
                <span>Sign Up</span>
                <i className="material-icons right">login</i>
            </button>
        </form>
    )
}

export default SignUp
