import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const Protected = (Component) => {
    
    return (props) => {

        const [ isLoading, setIsLoading ] = useState(true)
        const [ redirect, setRedirect ] = useState(false)

        useEffect(() => {

            fetch('http://127.0.0.1:4000/chat')
                .then((response) => {
                         
                    if(response.ok) {
                        setIsLoading(false) 
                    }
                    else {
                        console.log(response.statusText, 'please authenticate your self to use this service')
                        setIsLoading(false)
                        setRedirect(true)
                    }
                })
                .catch((err) => {
                    console.error(err)
                    setIsLoading(false)
                    setRedirect(true)
                })
        }, [])

        return (
            isLoading ? null : 
            redirect ? <Redirect to="/SignIn" /> 
            : <Component {...props} />
        )
    }
}

export default Protected
