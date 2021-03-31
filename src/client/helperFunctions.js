import M from 'materialize-css'

export const customAlert = (message) => {
    M.toast({
        html: message,
        inDuration: 800,
        outDuration: 800,
        displayLength: 2000,
        classes: 'rounded white black-text'
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
        chatWindow.style.background = `url(${imageURL}) no-repeat center`
        chatWindow.style.backgroundSize = 'cover'
        // chatWindow.style.opacity = '0.7'
        // chatWindow.style.zIndex = -1
    } 
    else {
        chatWindow.style.background = '#f2f2f2'
    }
}

export const removeWallpaper = () => {
    if(localStorage.getItem('bg-wallpaper') !== null) {
        let chatWindow = document.getElementById('chat-window')
        chatWindow.style.background = '#f2f2f2'
        localStorage.removeItem('bg-wallpaper')
    }
}

export const handleFileInput = (image) => {
    var url = window.URL.createObjectURL(image)
    localStorage.setItem('bg-wallpaper', JSON.stringify(url))
    setWallpaper(url)
}
