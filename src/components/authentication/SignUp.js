import React, { useState, useEffect } from 'react'
import TakeInput from '../main/TakeInput'
import { makePostRequest } from '../../client/helperFunctions'
import NavBar from './NavBar'
import { useHistory } from 'react-router-dom'
import './authenticate.css'

const SignUp = () => {

    const [ user, setUser ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ contact, setContact ] = useState('')
    const [ responseData, setResponseData ] = useState('')

    const history = useHistory()

    useEffect(() => {
        const error = responseData.errors?.email || responseData.errors?.password
        responseData.user ? history.push('/chat') : responseData ? alert(error) : null
    }, [responseData])

    const handleChange = (e) => {
        const { id, value } = e.target
        id === 'new-user' ? setUser(value) : id ===  'new-password' ? setPassword(value) : id === 'telephone' ? setContact(value) : id === 'email' ? setEmail(value) : null
    }

    const handleSubmit = (e) => {

        e.preventDefault()
        const data = {
            name: user,
            email,
            password,
            contact
        }

        makePostRequest('http://127.0.0.1:4000/sign-up', data, setResponseData)

        setUser('')
        setPassword('')
        setEmail('')
        setContact('')
    }

    return (
        <>
            <NavBar />
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
        </>
    )
}

export default SignUp
