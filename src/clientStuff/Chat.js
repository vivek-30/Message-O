import io from 'socket.io-client'
const URL = 'http://localhost:4000'
 
export const socket = io(URL)

// Respond when a user joins to chat
// socket.on('chat',RespondToChat)

// Respond to show total active users in chat
// socket.on('active',ManageUsersCount)

// Respond when a user types a message
// socket.on('status',RespondToStatus)

// Respond when a user leaves the chat
// socket.on('leave',RespondToLeave)
