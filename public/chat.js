var socket = io.connect('http://localhost:3000');
 
var display = document.getElementById('display');
var user = document.getElementById('user');
var message = document.getElementById('message');
var form = document.getElementById('chat-box');
var statusBar = document.getElementById('status-bar');

var audio = new Audio('./chat_tone.mp3');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(message.value.trim() === "" || user.value.trim() === ""){
        alert('empty field are not allowed');
    }
    else{
        user.disabled = true;
        socket.emit('chat',{
            user:user.value,
            message:message.value
        });
        message.value = "";
    }
});

message.addEventListener('keypress',()=>{
    socket.emit('status',user.value);
});

socket.on('chat',data=>{
    audio.play();
    statusBar.innerHTML = "";
    display.innerHTML += `<div>
        <span class="chat-msg">
            ${data.user} : ${data.message}
        </sapn>
    </div>`;
});

socket.on('status',user=>{
    statusBar.innerHTML = `<em>${user} is typing...</em>`;
});

socket.on('left',user=>{
    statusBar.innerHTML = "";
    alert(`${user} left the chat`);
});
