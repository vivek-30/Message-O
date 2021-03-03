var socket = io.connect('http://localhost:3000');
 
var display = document.getElementById('display'),
    user = document.getElementById('user'),
    message = document.getElementById('message'),
    form = document.getElementById('chat-box'),
    statusBar = document.getElementById('status-bar'),
    activeUsers = document.getElementById('active-users'),
    fileInput = document.getElementById('file-input'),
    video = document.getElementById('video'),
    mediaBox = document.getElementById('media-box'),
    canvas = document.getElementById('canvas');

var notify_tone = new Audio('./chat_tone.mp3');
var element = '';
let Stream;
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

const getRequiredElemet = (fileType) => {

    element = 'div';

    if(fileType.indexOf('image') !== -1)
        element = 'img';
    else if(fileType.indexOf('pdf') !== -1)
        element = 'embed';
    else if(fileType.indexOf('audio') !== -1)
        element = 'audio';
    else if(fileType.indexOf('video') !== -1)
        element = 'video';

    element = document.createElement(element);

    return element;
}

const provideFileBottom = (fileType) => {
    // return `<span class="file-bottom-section">
    //     <span><i class="material-icons blue-text text-darken-2" id="clear">clear</i></span>
    //     <span onClick="${fileType}Media();"><i class="material-icons blue-text text-darken-2" id="${fileType}">file_${fileType}</i></span>
    // </span>`;

    let span = document.createElement('span');
    span.classList.add('file-bottom-section');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');
    let i1 = document.createElement('i');
    i1.className = 'material-icons blue-text text-darken-2';
    i1.setAttribute('id','clear');
    let textNode1 = document.createTextNode('clear');
    i1.appendChild(textNode1)
    span2.appendChild(i1);

    let i2 = document.createElement('i');
    i2.className = 'material-icons blue-text text-darken-2';
    i2.setAttribute('id',fileType);
    let textNode2 = document.createTextNode(`file_${fileType}`);
    i2.appendChild(textNode2)
    span3.appendChild(i2);

    span3.addEventListener('click',(e) => {
        uploadMedia(e);
    })

    span.appendChild(span2);
    span.appendChild(span3);

    return span;
}

const insertFile = (file) =>{ 
    element = getRequiredElemet(file.type);
    element.src = URL.createObjectURL(file);
    element.classList.add('selected-file');
    let div = document.createElement('div');
    div.classList.add('file-container');
    div.appendChild(element);
    div.appendChild(provideFileBottom('upload'));
    display.appendChild(div);
}

socket.on('recieve-media',data => {
    let div = document.createElement('div');
    div.classList.add('file-container');
    div.appendChild(data.media);
    let content = provideFileBottom('download');
    div.appendChild(content);
    display.appendChild(div);
});

const uploadMedia = (e) => {

    if(user.value.trim() === ''){
        customAlert('Name Field is Empty');
        return;
    }

    socket.emit('send-media',{
        user:user.value,
        media:e.target.parentElement.previousSibling
    });
}

document.getElementById('file-input-icon').addEventListener('click',() => {
    fileInput.click();
});

fileInput.addEventListener('change',() => {
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

function TakePhoto(){
    if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
  
        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }
}

function handleStream(stream){
    Stream = stream
    mediaBox.style.display = 'inline';
    video.srcObject = stream;
    video.onloadedmetadata = function() {
        video.play();
    };

    let context = canvas.getContext('2d');

    document.getElementById('camera').addEventListener('click', function(){
        context.drawImage(video, 0, 0, 200, 200);
        TakePhoto();
    });
}

document.getElementById('stop').addEventListener('click',() => {
    // document.getElementById('chat-window').style.display = 'inline';
    // document.getElementById('features').style.display = 'inline';
    // document.getElementById('chat-box').style.display = 'inline';
    mediaBox.style.display = 'none';
    document.getElementById('stop').style.display = 'none';
    Stream.getTracks().forEach(track => {
        track.stop();
    });
})

function handleError(err){
    mediaBox.style.display = 'none';
    console.error('error occured during video call ',err.message);
}

document.getElementById('webcam').addEventListener('click',() => {
    // document.getElementById('chat-window').style.display = 'none';
    // document.getElementById('features').style.display = 'none';
    // document.getElementById('chat-box').style.display = 'none';
    if(navigator.getUserMedia){
        navigator.getUserMedia({
            audio:false,
            video:true
        },handleStream,handleError);
    }
});

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
    display.innerHTML += `<div class="chat-msg myleft">
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
