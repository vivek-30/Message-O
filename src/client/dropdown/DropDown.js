import React from 'react'
import { removeWallpaper } from '../helperFunctions'
import toggleTheme from '../darkMode/toggleTheme'
import './dropDown.css'

const lightDropDown = {
    border: '1px solid #f3f8f9',
    backgroundColor: '#f2f2f2',
    boxShadow: '2px 2px 2px #ccc'
}

const darkDropDown = {
    border: '1px solid #46b5d1',
    backgroundColor: '#424242',
    color: '#ccc',
    boxShadow: '2px 2px 2px #222222'
}

const DropDown = ({ theme, setOptions, setData, setTheme }) => {

    const currentTheme = theme === 'light' ? lightDropDown : darkDropDown

    const handleChoice = (e) => {
        let name = e.target.getAttribute('name')
        switch(name) {
            case 'clear-chat': {
                setData([])
                break
            }
            case 'toggle-theme': {
                toggleTheme()
                setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
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
        <div id="drop-down" style={{ ...currentTheme }}>
            <p name="clear-chat" onClick={handleChoice}>clear chat</p>
            <p name="toggle-theme" onClick={handleChoice}>Toggle Mode</p>
            <p name="reset-bg" onClick={handleChoice}>Reset Background</p>
        </div>
    )
}

export default DropDown
