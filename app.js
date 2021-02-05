const socket = require('socket.io');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

var users = {};
var totalUsers = 0;

app.use('/',express.static('public'));

var server = app.listen(PORT,function(){
    console.log(`listenning at port ${PORT}`)
});

const io = socket(server);

io.on('connection',function(socket){
    // console.log('connected with websocket with id ',socket.id);
    
    //increment totalUsers count when a new user joins
    totalUsers++;

    io.emit('total-users',totalUsers);
    socket.on('update-users',totalUsers => {
        io.sockets.emit('total-users',totalUsers);
    });

    socket.on('chat',data => {
        users[socket.id] = data.user;
        // io.sockets.emit('chat',data);
        socket.broadcast.emit('chat',data);
    });

    socket.on('status',data => {
        socket.broadcast.emit('status',data);
    });

    socket.on('disconnect',() => {
        //decrement totalUsers count when a user leaves the chat
        totalUsers--;
        socket.broadcast.emit('left',{
            user:users[socket.id],totalUsers:totalUsers
        });
        delete users[socket.id];
    });
});