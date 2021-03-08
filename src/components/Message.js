import React from 'react'

const Message = ({ messages }) => (
    messages.map((message,index) => (<p key={index}>{message}</p>) )
)

export default Message
