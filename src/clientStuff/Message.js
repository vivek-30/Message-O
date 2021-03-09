import React from 'react'

const Message = ({ data }) => { 
    return (
        data.map(( { user, message, alignment } , index ) => {
            return (
                <div key={index} className={`chat-msg ${alignment}`} >
                    <span>{user} : {message}</span>
                </div>
            )
        })
    )
}

export default Message
