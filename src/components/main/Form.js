import React, { useState, useEffect, useRef } from 'react'
import { socket } from '../../client/Chat'
import { customAlert } from '../../client/helperFunctions'
import TakeInput from './TakeInput'

var user = ''

export var displayEmoji = null
export var setName = (name) => {
    user = name
}

const Form = () => {

   const [ message, setMessage ] = useState('')
   const messageRef = useRef(null)

    useEffect(() => {
       // Make focus on message input field
       messageRef.current?.focus()
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
        setMessage(e.target.value)

        // let others know that you are typing a message.
        user && message.trim() !== '' ? socket.emit('status', user) : null
    }

    const handleSubmit = (e) => { 

        e.preventDefault()
        if(message.trim() === ''){
            customAlert('Empty fields are not allowed')
            return
        }

        emitMessage(message, user)
        setMessage('')    
    }

    displayEmoji = (emoji) => { 
        emitMessage(emoji, user, 'emoji')
    }    

    return (
        <form className="center section" id="chat-box" onSubmit={handleSubmit} >

            <TakeInput 
                iconName="chat" 
                labelText="Type Your Message"
                options={{
                    id: "message", 
                    type: 'text',
                    handleChange,
                    value: message,
                    ref: messageRef
                }}
            />

            <button type="submit" className="btn blue darken-2 z-depth-2">
                <span>Send</span>
                <i className="material-icons right">send</i>
            </button>
        </form>
    )
}

export default Form
