import React, { useState, useRef } from 'react'
import 'emoji-mart/css/emoji-mart.css'
import Emoji from '../emoji-picker/Emoji'
import { useHistory } from 'react-router-dom'
import { customAlert, handleFileInput } from '../../client/helperFunctions'

const Toolbar = ({ setOptions, theme }) => {

    const [ picker, setPicker ] = useState(false)
    
    const history = useHistory()
    const fileRef = useRef(null)

    const Logout = () => {
        fetch('http://127.0.0.1:4000/logout', {
            method: 'GET',
            credentials: 'include'
        })
        .then((response) => {
            response.ok ? history.push('/SignIn') 
            : customAlert('There is a problem in server please try again later')
        })
        .catch((err) => {
            console.log('Error in Logging out', err)
        })
    }

    return (
        <>
            { picker && <Emoji theme={theme} /> }
            <div className="grey darken-4" id="features">
                <span name="bg-wallpaper" onClick={() => { fileRef.current.click() }}>
                    <input 
                        type="file" 
                        accept="image/*" 
                        ref={fileRef} 
                        style={{ display: 'none' }} 
                        onChange={() => handleFileInput(fileRef.current.files[0])}
                    />
                    <i className="material-icons small">wallpaper</i>
                </span>
                <span name="video-call">
                    <i className="material-icons small">video_call</i>
                </span>
                <span name="logout" onClick={Logout}>
                    <i className="material-icons small">home</i>
                </span>
                <span name="emoji-picker" onClick={() => setPicker(!picker)}>
                    <i className="material-icons small">insert_emoticon</i>
                </span>
                <span name="more" onClick={() => setOptions(prevOptions => !prevOptions)}>
                    <i className="material-icons small">more_horiz</i>
                </span>
            </div>
        </>
    )
}

export default Toolbar
