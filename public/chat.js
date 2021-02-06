var socket = io.connect('http://localhost:3000');
 
var display = document.getElementById('display'),
    user = document.getElementById('user'),
    message = document.getElementById('message'),
    form = document.getElementById('chat-box'),
    statusBar = document.getElementById('status-bar'),
    activeUsers = document.getElementById('active-users'),
    fileInput = document.getElementById('file-input'),
    video = document.getElementById('video');

var notify_tone = new Audio('./chat_tone.mp3');
user.focus();

window.URL = window.URL || window.webkitURL;

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

const customAlert = (message) => {
    M.toast({
        html: message,
        inDuration: 800,
        outDuration: 800,
        displayLength: 2000
    });
}

const insertFile = (file) =>{
    console.log(file.type, file.size)
    let img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.classList.add('selected-file');
    let div = document.createElement('div');
    div.classList.add('file-container');
    div.appendChild(img);
    div.innerHTML += `<div class="file-bottom-section">
        <span><i class="material-icons">file_download</i></span>
        <span><i class="material-icons">file_upload</i></span>
    </div>`;
    display.appendChild(div);
}

document.getElementById('file-input-icon').addEventListener('click',e => {
    fileInput.click();
});

fileInput.addEventListener('change',e => {
    let files = fileInput.files;
    if(files.length > 0){
      for(file of files){
        insertFile(file);
      }
    }
});

document.getElementById('location').addEventListener('click',() => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            customAlert(`Latitude is ${position.coords.latitude} | Longitude is ${position.coords.longitude}`)
        });
    }else{
        customAlert('This feature is not supported in your browser');
    }
});

// document.getElementById('camera').addEventListener('click',() => {

//     if(navigator.getUserMedia){
//         navigator.getUserMedia({
//             audio:false,
//             video:true
//         },handleStream,handleError);
//     }
// });

form.addEventListener('submit',e => {
    e.preventDefault();
    if(message.value.trim() === "" || user.value.trim() === ""){
        alert('empty field are not allowed');
    }
    else{
        user.disabled = true;

        display.innerHTML+= `
            <div class="chat-msg myright">
                <span>${user.value} : ${message.value}</span>
            </div>`;

        display.scrollTop = display.scrollHeight;

        socket.emit('chat',{
            user:user.value,
            message:message.value
        });
        message.value = "";
    }
});

message.addEventListener('keypress',() => {
    socket.emit('status',user.value);
});

socket.on('total-users',total => {
    activeUsers.innerText = `${total} Active`;
});

socket.on('chat',data => {
    notify_tone.play();
    statusBar.innerHTML = "";
    statusBar.style.display = 'none';
    display.innerHTML += `
        <div class="chat-msg myleft">
            <span>${data.user} : ${data.message}</span>
        </div>`;
    display.scrollTop = display.scrollHeight;
});

socket.on('status',user => {
    statusBar.style.display = 'block';
    statusBar.style.backgroundColor = '#c2c2c2';
    statusBar.style.padding = '8px 20px';
    statusBar.innerHTML = `<em>${user} is typing...</em>`;
});

socket.on('left',user => {
    statusBar.innerHTML = "";
    if(user.user){
        customAlert(`${user.user} left the chat`);
    }
    socket.emit('update-users',user.totalUsers);
});
