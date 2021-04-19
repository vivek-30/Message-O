import React, { useState, useEffect } from 'react'
import { socket } from '../../client/Chat'
import { customAlert } from '../../client/helperFunctions'
import { Link } from 'react-router-dom'

const Banner = ({ theme }) => {

    const [ activeUsers, setActiveUsers ] = useState(1)

    useEffect(() => {

        let isMounted = true

        if(isMounted) {

            socket.emit('total-users')

            socket.on('total-users', (totalUsers) => {
                setActiveUsers(totalUsers)
            })

            socket.on('leave', ({ totalUsers, user }) => {
                setActiveUsers(totalUsers)
                if(user) {
                    customAlert(`${user.name} Left The Chat`, theme)
                }
            })

        }

        return () => {
            isMounted = false
        }

    }, [])

    const iconStyle = theme === 'dark' ? 'dark-icon' : 'teal-text'

    return (
        <div className="section center">
            <Link to="/chat">
                <span id="banner" className={`flow-text teal-text ${theme === 'dark' ? 'dark-banner' : ''}`}>Chat App</span>
                <span id="logo"><i className={`material-icons ${iconStyle}`}>forum</i></span>
            </Link>
            <span className={`right teal-text text-darken-5 ${theme === 'dark' ? 'dark-active' : ''}`} id="active-users">{activeUsers} Active</span>
        </div>
    )
}

export default Banner
