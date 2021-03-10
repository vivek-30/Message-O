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
        <div className="section center teal-text text-lighten-1">
            <a href="/" target="_blank">
                <span className="flow-text blue-text text-darken-2">Chat App</span>
                <span id="logo"><i className="material-icons blue-text text-darken-2">forum</i></span>
            </a>
            <span className="right green-text text-darken-4" id="active-users">{activeUsers} Active</span>
        </div>
    )
}

export default Banner