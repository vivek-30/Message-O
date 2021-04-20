import React, { useState, useEffect, useRef } from 'react'
import TakeInput from '../main/TakeInput'
import { makePostRequest } from '../../client/helperFunctions'
import NavBar from './NavBar'
import { useHistory } from 'react-router-dom'
import './authenticate.css'

const SignIn = () => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ responseData, setResponseData ] = useState('')

    const history = useHistory()
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current?.focus()
        const error = responseData.errors?.email || responseData.errors?.password
        responseData.user ? history.push('/chat') : responseData ? alert(error) : null
    }, [responseData])

    const handleChange = (e) => {
        const { id, value } = e.target
        id === 'user-email' ? setEmail(value) : id === 'password' ? setPassword(value) : null
    }

    const handleSubmit = (e) => {

        e.preventDefault()
        const Data = {
            email,
            password
        }

        makePostRequest('https://message-o.herokuapp.com/sign-in', Data, setResponseData)

        setEmail('')
        setPassword('')
    }

    return (
        <>
        <NavBar />
            <form className="authenticate" onSubmit={handleSubmit}>
                <h4 className="blue-text text-darken-2">Sign In</h4>
                <TakeInput 
                    iconName="mail" 
                    labelText="Your Email"
                    options={{
                        id: "user-email", 
                        type: 'email',
                        ref: inputRef,
                        handleChange,
                        value: email
                    }}
                />

                <TakeInput 
                    iconName="lock"  
                    labelText="Your Password"
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
        </>
    )
}

export default SignIn
