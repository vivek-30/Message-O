const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const cors = require('cors');
const router = require('./router');
const PORT = process.env.PORT || 4000;

var users = {};
var totalUsers = 0;

// For CORS Behaviour
app.use(cors());

// Handle requests
app.use(router);

const io = socket(server,{
    cors: {
      origin: "http://localhost:3000",
      credentials: true
    }
});

io.on('connection',(socket) => {
    // console.log('New user connected with ID : ',socket.id);

    //increment totalUsers count when a new user joins
    totalUsers++;

    io.emit('total-users',totalUsers);
    socket.on('update-users',totalUsers => {
        io.sockets.emit('total-users',totalUsers);
    });

    socket.on('chat',(data) => {
        users[socket.id] = data.user;
        // io.sockets.emit('chat',data);
        socket.broadcast.emit('chat',data);
    });

    socket.on('send-media',(data) => {
        socket.broadcast.emit('recieve-media',data);
    });

    socket.on('status',(data) => {
        socket.broadcast.emit('status',data);
    });

    socket.on('disconnect',() => {
        //decrement totalUsers count when a user leaves the chat
        totalUsers--;
        socket.broadcast.emit('left',{
            user:users[socket.id],
            totalUsers:totalUsers
        });
        delete users[socket.id];
    });
});

server.listen(PORT,() => {
    console.log(`listenning at port ${PORT}`);
});
