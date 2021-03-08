// var notify_tone = new Audio('../../public/chat_tone.mp3');
import M from 'materialize-css'

// socket event funtions
export const RespondToChat = (data) => {
    // notify_tone.play()
    console.log('respondToChat', data)
}

export const RespondToStatus = () => {
    console.log('respondToStatus')
}

export const RespondToLeave = () => {
    console.log('respondToLeave')
}

export const ManageUsersCount = (totalUsers) => {
    console.log('ManageUsersCount',totalUsers)
}

// other helper functions
export const customAlert = (message) => {
    M.toast({
        html: message,
        inDuration: 800,
        outDuration: 800,
        displayLength: 2000
    });
}