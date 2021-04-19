import M from 'materialize-css'

export const customAlert = (message, theme = 'light') => {
    const styleClasses = theme === 'light' ? 'white black-text' : 'grey darken-3 white-text'
    M.toast({
        html: message,
        inDuration: 800,
        outDuration: 800,
        displayLength: 5000,
        classes: `rounded ${styleClasses}`
    })
}

export const makePostRequest = (URL, Data, setResponseData) => {

    var responseData = {}

    fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(Data)
    })
    .then((response) => {
        if(!response.ok) {
            console.log('Error : ', response.statusText)
        }
        return response.json()
    })
    .then((data) => {
        responseData['user'] = data.user
        responseData['errors'] = data.errors
        setResponseData(responseData)
    })
    .catch((err) => {
        console.error('Error in making post request', err)
        responseData['errors'] = err
        setResponseData(responseData)
    })
}

export const setWallpaper = (url = null) => {

    let chatWindow = document.getElementById('chat-window')
    let savedURL = localStorage.getItem('bg-wallpaper')
    let imageURL = url ? url : savedURL ? JSON.parse(savedURL) : null
    if(imageURL) {
        chatWindow.style.background = `url(data:image/png;base64,${imageURL}) no-repeat center`
        chatWindow.style.backgroundSize = 'cover'
        // chatWindow.style.opacity = '0.7'
        // chatWindow.style.zIndex = -1
    } 
    else {
        chatWindow.style.background = '#f2f2f2'
    }
}

export const removeWallpaper = (theme) => {
    if(localStorage.getItem('bg-wallpaper') !== null) {
        let chatWindow = document.getElementById('chat-window')
        chatWindow.style.background = '#f2f2f2'
        localStorage.removeItem('bg-wallpaper')
    }
    else {
        customAlert('window is already in its default state', theme)
    }
}

export const handleFileInput = (image) => {

    const reader = new FileReader()
    reader.onloadend = () => {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '')
        localStorage.setItem('bg-wallpaper', JSON.stringify(base64String))
        setWallpaper(base64String)
    }
    reader.readAsDataURL(image)
}
