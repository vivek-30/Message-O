import React, { useState, useEffect, useRef } from 'react'
import 'emoji-mart/css/emoji-mart.css'
import M from 'materialize-css'
import Emoji from '../emoji-picker/Emoji'
import { useHistory } from 'react-router-dom'
import Modal from './Modal'
import { socket } from '../../client/Chat'
import { customAlert, handleFileInput } from '../../client/helperFunctions'

const Toolbar = ({ setOptions, theme }) => {

    const [ picker, setPicker ] = useState(false)    
    const [ instance, setInstance ] = useState(false)
    
    const history = useHistory()
    const fileRef = useRef(null)

    useEffect(() => {
        var elems = document.querySelectorAll('.tooltipped')
        elems ? M.Tooltip.init(elems, { position: 'top' }) : null
    }, [])

    const Logout = () => {
        fetch('http://127.0.0.1:4000/logout', {
            method: 'GET',
            credentials: 'include'
        })
        .then((response) => {
            response.ok ? history.push('/SignIn') 
            : customAlert('There is a problem in server please try again later', theme)
        })
        .catch((err) => {
            console.log('Error in Logging out', err)
        })
    }

    const iconStyle = theme === 'dark' ? 'dark-icon' : ''

    return (
        <>
            { picker && <Emoji theme={theme} /> }
            <div className={`grey darken-4 ${theme === 'dark' ? 'dark-modal' : ''}`} id="features">
                <span className="tooltipped" data-tooltip="Set Background Wallpaper" name="bg-wallpaper" onClick={() => { fileRef.current.click() }}>
                    <input 
                        type="file" 
                        accept="image/*" 
                        ref={fileRef} 
                        style={{ display: 'none' }} 
                        onChange={() => handleFileInput(fileRef.current.files[0])}
                    />
                    <i className={`material-icons small ${iconStyle}`}>wallpaper</i>
                </span>
                <span className="tooltipped" data-tooltip="Make Video Call" name="video-call" onClick={() => {
                    socket.emit('get-users-list')
                    instance ? instance?.open() : customAlert('Internal Error in Loding up the Modal', theme) 
                }}>
                    <i className={`material-icons small ${iconStyle}`}>video_call</i>
                </span>
                <span className="tooltipped" data-tooltip="Logout" name="logout" onClick={Logout}>
                    <i className={`material-icons small ${iconStyle}`}>home</i>
                </span>
                <span className="tooltipped" data-tooltip="Emoji Picker" name="emoji-picker" onClick={() => setPicker(!picker)}>
                    <i className={`material-icons small ${iconStyle}`}>insert_emoticon</i>
                </span>
                <span className="tooltipped" data-tooltip="More ..." name="more" onClick={() => setOptions(prevOptions => !prevOptions)}>
                    <i className={`material-icons small ${iconStyle}`}>more_horiz</i>
                </span>
            </div>
            <Modal theme={theme} setInstance={setInstance} />
        </>
    )
}

export default Toolbar
