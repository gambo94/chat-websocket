var path = require('path');
var express = require('express');
var http = require('http');
var routes = require('./routes/router');
var morgan = require('morgan');
var app = express();
// Setting up socket
var server = http.createServer(app);
var io = require('socket.io')(server);
// event 
io.on('connection', function (socket) {
    console.log('new user connected');
    socket.emit('message', 'Welcome to the chattt');
});
// Settings
app.set('port', process.env.PORT || 3000);
// middlewares
app.use(express.json());
app.use(morgan('dev'));
// static files
var parentDir = path.dirname(__dirname);
app.use(express.static(path.join(parentDir, 'public')));
// routes
app.use(routes);
server.listen(app.get('port'), function () {
    // connecting to DB
    var connect = require('./config/dbConnect')();
    // server running
    console.log("Server running on port " + app.get('port'));
});
//# sourceMappingURL=index.js.map