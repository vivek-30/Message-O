import React,{ useState, useEffect } from 'react'
import { socket } from '../../clientStuff/chat'
import Message from '../Message'

const ChatWindow = () => {

    const [ messages, setMessages ] = useState([])

    useEffect(() => {
        socket.on('chat',({ message }) => {
            setMessages(messages => [ ...messages, message ])
        })
    }, [])
    
    return (
        <div id="chat-window">
            <div id="display">
                <Message messages={messages} />
            </div>
            <div id="status-bar" className="teal-text text-darken-2"></div>
        </div>
    )
}

export default ChatWindow
