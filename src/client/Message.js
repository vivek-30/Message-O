import { Emoji } from 'emoji-mart'
import React from 'react'

const Message = ({ data }) => { 
    return (
        data.map(( { user, message, alignment, type }, index ) => {
            return (
                <div key={index} className={`chat-msg ${alignment}`} >
                    {type === 'message' ? <span>{user} : {message}</span> : <Emoji emoji={message} size={40} />}
                </div>
            )
        })
    )
}

export default Message
