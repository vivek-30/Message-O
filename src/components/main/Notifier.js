import React from 'react'
import { useHistory } from 'react-router-dom'
import { callRejected } from '../majorComponents/videoCall/VideoCall'

const Notifier = ({ person, personID, theme }) => {

    const history = useHistory()

    return (
        <div id="notifier" className={`${theme === 'dark' ? 'dark-notifier dark-border' : 'light-notifier light-shadow'}`}>
            <div id="notifier-title" className={`center ${theme === 'dark' ? 'grey-text' : 'black-text'}`}>
                {person} wants you to join video conference.
            </div>
            <div className={`${theme === 'dark' ? 'dark-notifier' : 'light-notifier'}`}>
                <button className="left btn-flat red-text text-darken-2" onClick={callRejected}>
                    Cancel
                </button>
                <button className="right btn-flat blue-text" onClick={() => {
                    history.push(`VideoCall/${personID}`)
                }}>
                    Join
                </button>
            </div>
        </div>
    )
}

export default Notifier
