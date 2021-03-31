import React, { useState, useEffect, useRef } from 'react'
import TakeInput from '../main/TakeInput'
import { makePostRequest } from '../../client/helperFunctions'
import NavBar from './NavBar'
import { setName } from '../main/Form'
import { useHistory } from 'react-router-dom'
import './authenticate.css'

const SignUp = () => {

    const [ user, setUser ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ contact, setContact ] = useState('')
    const [ responseData, setResponseData ] = useState('')

    const history = useHistory()
    const inputRef = useRef()

    useEffect(() => {
        inputRef.current?.focus()
        const error = responseData.errors?.email || responseData.errors?.password
        if(responseData.user) {
            setName(responseData.user.name)
            history.push('/chat')
        }
        else if(responseData) {
            alert(error)
        }
    }, [responseData])

    const handleChange = (e) => {
        const { id, value } = e.target
        id === 'new-user' ? setUser(value) : id ===  'new-password' ? setPassword(value) : id === 'telephone' ? setContact(value) : id === 'email' ? setEmail(value) : null
    }

    const handleSubmit = (e) => {
        
        e.preventDefault()
        const Data = {
            name: user,
            email,
            password,
            contact
        }

        makePostRequest('http://127.0.0.1:4000/sign-up', Data, setResponseData)

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
                    labelText="Your Name"
                    options={{
                        id: "new-user", 
                        type: 'text',
                        ref: inputRef,
                        handleChange,
                        value: user
                    }}
                />
                
                <TakeInput 
                    iconName="mail"  
                    labelText="Your Email Address"
                    options={{
                        id: "email", 
                        type: 'email',
                        handleChange,
                        value: email
                    }}
                />

                <TakeInput 
                    iconName="lock"  
                    labelText="Your Password"
                    options={{
                        id: "new-password", 
                        type: 'password',
                        handleChange,
                        value: password
                    }}
                />

                <TakeInput 
                    iconName="phone"  
                    labelText="Your Contact Number"
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
