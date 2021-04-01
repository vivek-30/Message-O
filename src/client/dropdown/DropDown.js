import React from 'react'
import { removeWallpaper } from '../helperFunctions'
import './dropDown.css'

const DropDown = ({ theme, setOptions, setData, setTheme }) => {

    const toggleTheme = () => {
        let newTheme = theme === 'light' ? 'dark' : 'light'
        localStorage.setItem('theme', newTheme)
        setTheme(newTheme)
    }

    const handleChoice = (e) => {
        let name = e.target.getAttribute('name')
        switch(name) {
            case 'clear-chat': {
                setData([])
                break
            }
            case 'toggle-theme': {  
                toggleTheme()             
                break
            }
            case 'reset-bg': {
                removeWallpaper(theme)
                break
            }
            default: {
                console.log('None of the available option')
            }
        }
        setOptions(prevOptions => !prevOptions)
    }

    return (
        <div id="drop-down" className={`${theme === 'dark' ? 'dark-drop-down' : ''}`}>
            <p name="clear-chat" onClick={handleChoice}>clear chat</p>
            <p name="toggle-theme" onClick={handleChoice}>Toggle Mode</p>
            <p name="reset-bg" onClick={handleChoice}>Reset Background</p>
        </div>
    )
}

export default DropDown
