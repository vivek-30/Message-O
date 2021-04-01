const toggleTheme = () => {

    document.querySelector('body').classList.toggle('dark-bg')
    document.getElementById('chat-window').classList.toggle('dark-window')
    document.getElementById('message-box').classList.toggle('dark-message-box')
    document.querySelectorAll('i').forEach((icon) => {
        icon.classList.toggle('dark-icon')
    })
    document.getElementById('features').classList.toggle('dark-features')    
    document.getElementById('banner').classList.toggle('dark-banner')
    document.getElementById('drop-down').classList.toggle('dark-drop-down')
    document.getElementById('active-users').classList.toggle('dark-active')
}

export default toggleTheme
