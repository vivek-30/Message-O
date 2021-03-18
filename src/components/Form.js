import React, { useState, useEffect, useRef } from 'react'
import { socket } from '../clientStuff/Chat';
import { customAlert } from '../clientStuff/helperFunctions'

export var displayEmoji = null

const Form = () => {

   const [ user, setUser ] = useState('');
   const [ message, setMessage ] = useState('');
   const [ isDisabled, setIsDisabled ] = useState(false);
   const userRef = useRef(null)
   const messageRef = useRef(null)

    useEffect(() => {
       // Make focus on username input field
       userRef.current.focus()
    },[])

    const emitMessage = (message, user = '', type = 'message') => {

        socket.emit('myMsg',{
            user,
            message,
            type,
            alignment: 'myright'
        })

        socket.emit('chat',{
            user,
            message,
            type,
            alignment: 'myleft'
        })
    }

    const handleSubmit = (e) => { 
        e.preventDefault();
        if(message.trim() === '' || user.trim() === ''){
            customAlert('Empty fields are not allowed')
            return;
        }

        if(!isDisabled){
            setIsDisabled(true);
        }

        emitMessage(message,user)
        // clear input field for fresh message
        setMessage('')    
    }

    const handleChange = (e) => {
        if(e.target.id === 'user'){
            setUser(e.target.value)
        }
        else if(e.target.id === 'message'){
            setMessage(e.target.value)
            
            // let others know that you are typing a message.
            socket.emit('status',user)
        }
    }

    displayEmoji = (emoji) => { 
        emitMessage(emoji,user,'emoji')
    }    

    return (
        <form className="center section" id="chat-box" onSubmit={handleSubmit} >
            <div className="input-field">
                <i className="material-icons prefix teal-text text-ligthen-1">person</i>
                <input id="user" type="text" ref={userRef} onChange={handleChange} value={user} autoComplete="off" disabled={isDisabled} />
                <label htmlFor="user">Your Name</label>
            </div>
            <div className="input-field">
                <i className="material-icons prefix teal-text text-lighten-1">chat</i>
                <input id="message" type="text" ref={messageRef} onChange={handleChange} value={message} autoComplete="off" />
                <label htmlFor="message">Your Message</label>
            </div>
            <button type="submit" className="btn teal z-depth-2">
                <span>Send</span>
                <i className="material-icons right">send</i>
            </button>
        </form>
    )
}

export default Form
