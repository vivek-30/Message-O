const socket = require('socket.io');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

var users = {};

app.use('/',express.static('public'));

var server = app.listen(PORT,function(){
    console.log(`listenning at port ${PORT}`)
});

const io = socket(server);

io.on('connection',function(socket){
    // console.log('connected with websocket with id ',socket.id);

    socket.on('chat',data=>{
        users[socket.id] = data.user;
        io.sockets.emit('chat',data);
    });

    socket.on('status',(data)=>{
        socket.broadcast.emit('status',data);
    });

    socket.on('disconnect',()=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
});