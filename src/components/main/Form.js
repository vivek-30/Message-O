import React, { useState, useEffect, useRef } from 'react'
import { socket } from '../../client/Chat'
import { customAlert } from '../../client/helperFunctions'

export var user = ''

export var displayEmoji = null
export var setName = (name) => {
    user = name
}

const Form = ({ theme }) => {

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
            customAlert('Empty fields are not allowed', theme)
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
            
            <input 
                type="text" 
                id="message-box"
                value={message}
                ref={messageRef} 
                onChange={handleChange} 
                autoComplete="off"
                placeholder="Type Your Message ..."
                className={theme === 'dark' ? 'dark-message-box' : ''}
                required
            />

            <button id="send-msg-btn" type="submit" className={`btn-floating blue-grey ${theme === 'dark' ? 'dark-send-btn' : ''}`}>
                <i className={`material-icons ${theme === 'dark' ? 'dark-icon' : ''}`}>send</i>
            </button>
        </form>
    )
}

export default Form
