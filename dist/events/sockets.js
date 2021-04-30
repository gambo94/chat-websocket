var msgToObj = require('../utils/message');
var control = require('../controller/controller');
module.exports = function (io) {
    // events
    io.on('connection', function (socket) {
        // Join event
        socket.on('joinRoom', function (_a) {
            // check if user exist
            var username = _a.username, password = _a.password, room = _a.room;
            // load chat room
            // Welcome current user (Sends a message to the single client)
            socket.emit('message', msgToObj('Bot', 'Welcome to the chat'));
            // Broadcast when a user connects (notifies everybody but the not the current client)
            socket.broadcast.emit('message', msgToObj('Bot', 'A user has joined the chat'));
            // Runs when client disconnects, notifies all clients
            socket.on('disconnect', function () {
                io.emit('message', msgToObj('Bot', 'A user has left the chat'));
            });
        });
        // Listen for chatMessage
        socket.on('chatMessage', function (msg) {
            // emits to everybody
            io.emit('message', msgToObj('USER', msg));
        });
    });
};
//# sourceMappingURL=sockets.js.map