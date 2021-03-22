const http = require('http');
const cors = require('cors');
const express = require('express');
const socket = require('socket.io');
const cookieParser = require('cookie-parser')
const router = require('./router');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

var users = {};
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

    socket.on('myMsg',(data) => {
        io.to(socket.id).emit('myMsg',data);
    });

    socket.on('chat',(data) => {
        users[socket.id] = data.user;
        // io.sockets.emit('chat',data);
        socket.broadcast.emit('chat',data);
    });

    socket.on('status',(user) => {
        socket.broadcast.emit('status',user);
    });

    socket.on('disconnect',() => {
        //decrement totalUsers count when a user leaves the chat
        totalUsers--;
        socket.broadcast.emit('leave',{
            user:users[socket.id],
            totalUsers
        });
        delete users[socket.id];
    });
});

server.listen(PORT,() => {
    console.log(`listenning at port ${PORT}`);
});
