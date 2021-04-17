import React, { useState, useEffect, useRef } from 'react'
import M from 'materialize-css'
import { socket } from '../../client/Chat'
import { user } from './Form'
import { useHistory } from 'react-router-dom'

const Modal = ({ setInstance, theme }) => {

    const [ myID, setMyID ] = useState('')
    const [ users, setUsers ] = useState([])
    
    const history = useHistory()
    const modalRef = useRef(null)

    useEffect(() => {

        let isMounted = true

        if(isMounted) {

            socket.emit('get-myID')
			socket.on('myID', (id) => setMyID(id))
            
            socket.emit('get-users-list')
            socket.on('users-list', (users) => setUsers(users))

            socket.on('leave', () => {
                socket.emit('get-users-list')
            })
    
            if(modalRef.current) {
                var instance = M.Modal.init(modalRef.current, {
                    dismissible: true
                })
                setInstance(instance)
            }
            else {
                console.log('Modal Is Yet To Be Loaded.')
            }
        }

        return () => {
            isMounted = false
        }

    }, [])

    return (
        <div id="modal" ref={modalRef} className={`modal bottom-sheet ${theme === 'dark' ? 'dark-bg' : ''}`}>
            <div className="modal-content">
                <p className={`flow-text ${theme === 'dark' ? 'blue-text' : ''}`}>Online Users</p>
                <ul className="collection">
                    { users.length ? users.map(({ id, name }) => {
                        return (
                            <li 
                                key={id} 
                                className={`collection-item ${theme === 'dark' ? 'dark-list' : ''}`}
                                onClick={() => {
                                    socket.emit('notify-user', { id, user, myID })
                                    history.push(`/VideoCall/${id}`)
                                }}
                            >
                                {name}
                            </li>
                        )
                    }) : ( 
                    <li className={`collection-item ${theme === 'dark' ? 'dark-list' : ''}`}>
                        No User is Currently active
                    </li> ) }
                </ul>
            </div>
            <div className={`modal-footer ${theme === 'dark' ? 'dark-bg' : ''}`}>
                <button className={
                    `modal-close btn-flat ${theme === 'dark' ? 'blue-text' : ''}`
                }>close</button>
            </div>
        </div>
    )
}

export default Modal
