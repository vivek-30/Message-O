import React, { Component } from 'react'

class ChatWindow extends Component {
    render() {
        return (
            <div id="chat-window">
                <div id="display"></div>
                <div id="status-bar" className="teal-text text-darken-2"></div>
            </div>
        )
    }
}

export default ChatWindow
