import { Emoji } from 'emoji-mart'
import React from 'react'

const Message = ({ data, theme }) => { 
    return (
        data.map(( { user, message, alignment, type }, index ) => {
            return (
                <div key={index} className={`${theme === 'light' ? 'chat-msg' : 'dark-msg'} ${alignment}`} >
                    {
                    type === 'message' ? 
                    <span style={{ backgroundColor: theme === 'light' ? '#ecf1f7' : '#46b5d1' }}>{user} : {message}</span> 
                    : <Emoji emoji={message} size={40} style={{ backgroundColor: theme === 'light' ? '#ecf1f7' : '#46b5d1' }} />
                    }
                </div>
            )
        })
    )
}

export default Message
