const http = require('http');
const cors = require('cors');
const express = require('express');
const socket = require('socket.io');
const cookieParser = require('cookie-parser');
const router = require('./router');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

var users = [];
var totalUsers = 0;

// Handle CORS Behaviour.
app.use(cors(
    {
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200,
        credentials: true
    }
));

// Parse JSON Data.
app.use(express.json());

// Set cookie parser.
app.use(cookieParser());

// Handle credentials and cookie for browser.
app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

// Handle Requests.
app.use(router);

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true
    }
});

io.on('connection', (socket) => {
    // console.log('New user connected with ID :', socket.id);

    const { id: ID } = socket; // grab id as ID from socket object
    totalUsers++;

    io.emit('total-users', totalUsers);

    socket.on('new-user', (name) => {

        if(users.length) {
            let user = users.find((user) => user.id === ID)
            if(!user) {
                users.push({ id: ID, name });
            }
        }
        else {
            users.push({ id: ID, name }); 
        }
    });

    socket.on('myMsg', (data) => {
        io.to(ID).emit('myMsg', data);
    });

    socket.on('chat', (data) => {
        // io.sockets.emit('chat', data);
        socket.broadcast.emit('chat', data);
    });

    socket.on('status', (user) => {
        socket.broadcast.emit('status', user);
    });

    socket.on('disconnect', () => {
        totalUsers--;
        socket.broadcast.emit('call-ended'); // for video call
        var user = users.find((user) => user.id === ID);
        socket.broadcast.emit('leave', {
            user,
            totalUsers
        });
        users = users.filter((user) => user.id !== ID);
    });

    // Video-conference stuff
    socket.on('get-myID', () => {
        io.to(ID).emit('myID', ID);
    });

    socket.on('get-users-list', () => {
        io.emit('users-list', users);
    });
    
    socket.on('call-user', ({ userToCall, signalData, from }) => {
        let user = users.find((user) => user.id == from);
        io.to(userToCall).emit('call-user', {
            name: user.name,
            from,
            signal: signalData
        });
    });

    socket.on('notify-user', ({ id, user, myID }) => {
        io.to(id).emit('notify-user', { user, myID });
    });

    socket.on('answer-call', ({ signal, to }) => {
        io.to(to).emit('call-accepted', signal);
    });

    socket.on('call-rejected', (userID) => {
        let user = users.find((user) => user.id === ID)
        io.to(userID).emit('call-rejected', user.name)
    });
});

server.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
