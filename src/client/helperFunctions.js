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
        if(response.status === 200 || response.status === 201) {
            // this.props.history.push('/');
            // console.log(res)
            return response.json()
        }
        else {
            console.log(response.json(), response)
            const error = new Error(response.error)
            throw error;
        }
    })
    .then((data) => {
        console.log('signup result ->', data)
        output = data;
    })
    .catch((err) => {
        console.error(err);
        output = err;
        alert('Error logging in please try again')
    })

    return output
}
