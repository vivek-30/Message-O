var socket = io.connect('http://localhost:3000');
 
var display = document.getElementById('display');
var user = document.getElementById('user');
var message = document.getElementById('message');
var form = document.getElementById('chat-box');
var statusBar = document.getElementById('status-bar');
var activeUsers = document.getElementById('active-users')

var audio = new Audio('./chat_tone.mp3');
user.focus();

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
    activeUsers.innerHTML = `${total} people active`;
});

socket.on('chat',data => {
    audio.play();
    statusBar.innerHTML = "";
    display.innerHTML += `\
        <div class="chat-msg myleft">
            <span>${data.user} : ${data.message}</span>
        </div>`;
    display.scrollTop = display.scrollHeight;
});

socket.on('status',user => {
    statusBar.innerHTML = `<em>${user} is typing...</em>`;
});

socket.on('left',user => {
    statusBar.innerHTML = "";
    if(user.user)
    M.toast({
        html: `${user.user} left the chat`,
        inDuration: 800,
        outDuration: 800,
        displayLength: 1500
    })
    socket.emit('update-users',user.totalUsers);
});
