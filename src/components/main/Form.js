import React, { useState, useEffect, useRef } from 'react'
import { socket } from '../../client/Chat'
import { customAlert } from '../../client/helperFunctions'
import TakeInput from './TakeInput'

export var displayEmoji = null

const Form = () => {

   const [ user, setUser ] = useState('')
   const [ message, setMessage ] = useState('')
   const [ isDisabled, setIsDisabled ] = useState(false)
   const userRef = useRef(null)
   const messageRef = useRef(null)

    useEffect(() => {
       // Make focus on username input field
       userRef.current?.focus()
    }, [])

    const emitMessage = (message, user = '', type = 'message') => {

        socket.emit('myMsg', {
            user,
            message,
            type,
            alignment: 'myright'
        })

        socket.emit('chat', {
            user,
            message,
            type,
            alignment: 'myleft'
        })
    }

    const handleChange = (e) => {
        const { id, value } = e.target
        id === 'user' ? setUser(value) : id ===  'message' ? setMessage(value) : null

        // let others know that you are typing a message.
        isDisabled && message.trim() !== '' ? socket.emit('status', user) : null
    }

    const handleSubmit = (e) => { 
        e.preventDefault()
        if(message.trim() === '' || user.trim() === ''){
            customAlert('Empty fields are not allowed')
            return
        }

        if(!isDisabled){
            setIsDisabled(true)
        }

        emitMessage(message, user)
        // clear input field for fresh message
        setMessage('')    
    }

    displayEmoji = (emoji) => { 
        emitMessage(emoji, user, 'emoji')
    }    

    return (
        <form className="center section" id="chat-box" onSubmit={handleSubmit} >
             <TakeInput 
                iconName="person" 
                labelText="Your Name"
                iconColor="teal"
                options={{
                    id: "user", 
                    type: 'text',
                    handleChange,
                    value: user,
                    ref: userRef,
                    disabled: isDisabled
                }}
            />

            <TakeInput 
                iconName="chat" 
                labelText="Your Message"
                iconColor="teal"
                options={{
                    id: "message", 
                    type: 'text',
                    handleChange,
                    value: message,
                    ref: messageRef
                }}
            />

            <button type="submit" className="btn teal z-depth-2">
                <span>Send</span>
                <i className="material-icons right">send</i>
            </button>
        </form>
    )
}

export default Form
