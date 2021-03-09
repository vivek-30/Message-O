import React, { useState, useEffect, useRef } from 'react'
import { socket } from '../clientStuff/Chat';
import { customAlert } from '../clientStuff/helperFunctions'

const Form = () => {

   const [ user, setUser ] = useState('');
   const [ message, setMessage ] = useState('');
   const [ isDisabled, setIsDisabled ] = useState(false);
   const userRef = useRef(null)
   const messageRef = useRef(null)

    useEffect(() => {
       userRef.current.focus() // Make focus on username input field
    },[])

    const handleSubmit = (e) => { 
        e.preventDefault();
        if(message.trim() === '' || user.trim() === ''){
            customAlert('Empty fields are not allowed')
            return;
        }

        if(!isDisabled){
            setIsDisabled(true);
        }

        socket.emit('myMsg',{
            user,
            message,
            alignment: 'myright'
        })

        socket.emit('chat',{
            user,
            message,
            alignment: 'myleft'
        })

        // clear input field for fresh message
        setMessage('') 
    
        // display.scrollTop = display.scrollHeight;
    
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

    return (
        <form className="center section" id="chat-box" onSubmit={handleSubmit} >
            <div className="input-field">
                <i className="material-icons prefix blue-text text-darken-2">person</i>
                <input id="user" type="text" ref={userRef} onChange={handleChange} value={user} autoComplete="off" disabled={isDisabled} />
                <label htmlFor="user">Your Name</label>
            </div>
            <div className="input-field">
                <i className="material-icons prefix blue-text text-darken-2">chat</i>
                <input id="message" type="text" ref={messageRef} onChange={handleChange} value={message} autoComplete="off" />
                <label htmlFor="message">Your Message</label>
            </div>
            <button type="submit" className="btn blue darken-2 z-depth-2" id="send-btn">
                <span>Send</span>
                <i className="material-icons right">send</i>
            </button>
        </form>
    )
}

export default Form
