import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { setName } from '../main/Form'

const Protected = (Component) => {
    
    return (props) => {

        const [ isLoading, setIsLoading ] = useState(true)
        const [ redirect, setRedirect ] = useState(false)

        useEffect(() => {

            let isMounted = true

            fetch('http://127.0.0.1:4000/chat', {
                method: 'GET',
                credentials: "include"
            })
            .then((response) => {
                        
                if(response.ok) {
                    isMounted ? setIsLoading(false) : null
                }
                else {
                    console.log(response.statusText, 'please authenticate your self to use this service')
                    if(isMounted) {
                        setIsLoading(false)
                        setRedirect(true)
                    }
                }
                return response.json()
            })
            .then((data) => {
                data.error ? console.log('error in verifying user', data.error) : data.success && data.name ? setName(data.name) : null
            })
            .catch((err) => {
                console.error(err)
                setIsLoading(false)
                setRedirect(true)
            })

            return () => {
                isMounted = false
            }

        }, [])

        return (
            isLoading ? null : 
            redirect ? <Redirect to="/SignIn" /> 
            : <Component {...props} />
        )
    }
}

export default Protected
