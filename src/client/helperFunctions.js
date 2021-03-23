import M from 'materialize-css'

export const customAlert = (message) => {
    M.toast({
        html: message,
        inDuration: 800,
        outDuration: 800,
        displayLength: 2000
    })
}

export const makePostRequest = (URL, Data) => {

    var output = 'No output yet!'

    fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(Data)
    })
    .then((response) => {
        if(response.ok) {
            // history.push('/chat')
        }
        else {
            // const error = new Error(response.error)
            console.log('response error message', response.statusText)
        }
        return response.json()
    })
    .then((data) => {
        console.log('post request result ->', data.errors, data.user)
        output = data
    })
    .catch((err) => {
        console.error('fetch error ->', err)
        output = err
    })

    return output
}
