const path = require('path');
const express = require('express');
const http = require('http');
const routes = require('./routes/router')
const morgan = require('morgan');


const app = express();

// Setting up socket
const server = http.createServer(app);
const io = require('socket.io')(server);


// event 
io.on('connection', socket => {
    console.log('new user connected');

    socket.emit('message', 'Welcome to the chattt')
});

// Settings
app.set('port', process.env.PORT || 3000);


// middlewares
app.use(express.json());
app.use(morgan('dev'));

// static files
const parentDir = path.dirname(__dirname);
app.use(express.static(path.join(parentDir, 'public')));

// routes
app.use(routes);




server.listen(app.get('port'), () => {
    // connecting to DB
    const connect = require('./config/dbConnect')();
    // server running
    console.log(`Server running on port ${app.get('port')}`)
})






