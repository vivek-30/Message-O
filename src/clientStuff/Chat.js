import React, { useEffect } from 'react'
import io from 'socket.io-client'
// import { RespondToChat, RespondToStatus, RespondToLeave, ManageUsersCount } from './helperFunctions'
const URL = 'localhost:4000'
 
var socket = null

// Respond when a user joins to chat
// socket.on('chat',RespondToChat)

// // Respond to show total active users in chat
// socket.on('active',ManageUsersCount)

// // Respond when a user types a message
// socket.on('status',RespondToStatus)

// // Respond when a user leaves the chat
// socket.on('leave',RespondToLeave)

const Chat = () => {

    useEffect(() => {
        socket = io(URL)
        socket.emit('chat',{data:'successful installation on ui'})
    },[URL])

    useEffect(() => {
        socket.on('chat', data => {
          console.log('inside client data = ',data)
        });
    }, []);

    return (
        <div>
            <span>hi client</span>
        </div>
    )
}

export default  Chat
