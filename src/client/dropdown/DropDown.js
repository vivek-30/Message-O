import React from 'react'
import { customAlert, removeWallpaper } from '../helperFunctions'
import './dropDown.css'

const DropDown = ({ setData }) => {

    const handleChoice = (e) => {
        let name = e.target.getAttribute('name')
        switch(name) {
            case 'clear-chat': {
                setData([])
                break
            }
            case 'toggle-theme': {
                customAlert('This feature is comming soon ....')
                break
            }
            case 'reset-bg': {
                removeWallpaper()
                break
            }
            default: {
                console.log('None of the available option')
            }
        }
    }

    return (
        <div id="drop-down">
            <p name="clear-chat" onClick={handleChoice}>clear chat</p>
            <p name="toggle-theme" onClick={handleChoice}>Toggle Mode</p>
            <p name="reset-bg" onClick={handleChoice}>Reset Background</p>
        </div>
    )
}

export default DropDown
