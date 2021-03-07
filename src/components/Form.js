import React, { Component } from 'react'

class Form extends Component {
    render() {
        return (
            <form className="center section" id="chat-box">
                <div className="input-field">
                    <i className="material-icons prefix blue-text text-darken-2">person</i>
                    <input type="text" id="user" />
                    <label htmlFor="user">Your Name</label>
                </div>
                <div className="input-field">
                    <i className="material-icons prefix blue-text text-darken-2">chat</i>
                    <input type="text" id="message" required />
                    <label htmlFor="message">Your Message</label>
                </div>
                <button type="submit" className="btn blue darken-2 z-depth-2" id="send-btn">
                    <span>Send</span>
                    <i className="material-icons right">send</i>
                </button>
            </form>
        )
    }
}

export default Form
