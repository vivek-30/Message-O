import React, { useState } from 'react'

function Form() {

   const [ username, setUsername ] = useState('');
   const [ message, setMessage ] = useState('');

    const handleSubmit = (e) => { 
        e.preventDefault();
        // alert('username '+username+' message '+message)
        if(message.trim() === '' || username.trim() === ''){
            alert('empty field are not allowed');
        }
        setUsername('')
        setMessage('')
        // else{
        //     user.disabled = true;
    
        //     display.innerHTML+= `
        //         <div class="chat-msg myright">
        //             <span>${username} : ${message}</span>
        //         </div>`;
    
        //     display.scrollTop = display.scrollHeight;
        // }
    
    }

    const handleChange = (e) => {
        if(e.target.id === 'user'){
            setUsername(e.target.value)
        }
        else if(e.target.id === 'message'){
            setMessage(e.target.value)
        }
    }

    return (
        <form className="center section" id="chat-box" onSubmit={handleSubmit} >
            <div className="input-field">
                <i className="material-icons prefix blue-text text-darken-2">person</i>
                <input id="user" type="text" onChange={handleChange} value={username} autoComplete="off" />
                <label htmlFor="user">Your Name</label>
            </div>
            <div className="input-field">
                <i className="material-icons prefix blue-text text-darken-2">chat</i>
                <input id="message" type="text" onChange={handleChange} value={message} autoComplete="off" />
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
