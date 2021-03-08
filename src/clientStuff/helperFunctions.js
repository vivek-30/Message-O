var notify_tone = new Audio('../../public/chat_tone.mp3');

export function RespondToChat(data) {
    notify_tone.play()
    console.log('respondToChat', data)
}

export function RespondToStatus() {
    console.log('respondToStatus')
}

export function RespondToLeave() {
    console.log('respondToLeave')
}

export function ManageUsersCount(totalUsers) {
    console.log('ManageUsersCount',totalUsers)
}
