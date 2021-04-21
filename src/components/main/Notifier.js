import React from 'react'
import { useHistory } from 'react-router-dom'
import { socket } from '../../client/Chat'

const Notifier = ({ person, personID, stopTimeOutID, setDisplayNotifier, theme }) => {

    const history = useHistory()

    return (
        <div id="notifier" className={`${theme === 'dark' ? 'dark-notifier' : 'light-notifier light-shadow'}`}>
            <div id="notifier-title" className={`center ${theme === 'dark' ? 'grey-text' : 'black-text'}`}>
                {person} wants you to join video conference.
            </div>
            <div className={`${theme === 'dark' ? 'dark-notifier' : 'light-notifier'}`}>
                <button className="left btn-flat blue-text text-darken-1" onClick={() => {
                    clearTimeout(stopTimeOutID)
                    setDisplayNotifier(false)
                    socket.emit('call-rejected', personID)
                }}>
                    Cancel
                </button>
                <button className="right btn-flat blue-text text-darken-1" onClick={() => {
                    clearTimeout(stopTimeOutID)
                    history.push(`VideoCall/${personID}`)
                }}>
                    Join
                </button>
            </div>
        </div>
    )
}

export default Notifier
