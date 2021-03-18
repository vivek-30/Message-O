import React, { useState, useEffect} from 'react'
import { socket } from '../clientStuff/Chat'
import { customAlert } from '../clientStuff/helperFunctions'

const Banner = () => {

    const [ activeUsers, setActiveUsers ] = useState(1)

    useEffect(() => {
        socket.on('total-users',(totalUsers) => {
            setActiveUsers(totalUsers)
        })

        socket.on('leave',({ totalUsers, user }) => {
            setActiveUsers(totalUsers)
            if(user){
                customAlert(`${user} Left The Chat`)
            }
        })
    },[])

    return (
        <div className="section center">
            <a href="/" target="_blank">
                <span className="flow-text teal-text">Chat App</span>
                <span id="logo"><i className="material-icons teal-text">forum</i></span>
            </a>
            <span className="right teal-text text-darken-5" id="active-users">{activeUsers} Active</span>
        </div>
    )
}

export default Banner