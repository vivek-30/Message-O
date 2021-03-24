import M from 'materialize-css'

export const customAlert = (message) => {
    M.toast({
        html: message,
        inDuration: 800,
        outDuration: 800,
        displayLength: 2000
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
