import React from 'react'

function Banner() {
    return (
        <div className="section center teal-text text-lighten-1">
            <a id="homelink" href="/" target="_blank">
                <span className="flow-text blue-text text-darken-2" id="banner">Chat App</span>
                <span id="logo"><i className="material-icons blue-text text-darken-2">forum</i></span>
            </a>
            <span className="right green-text text-darken-4" id="active-users"></span>
        </div>
    )
}

export default Banner