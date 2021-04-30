const msgToObj = require('../utils/message');
const control = require('../controller/controller');

module.exports = (io) => {

        // events
        io.on('connection', socket => {

            // Join event
            socket.on('joinRoom', ({ username, password, room }) =>{

                // check if user exist

                // load chat room

                // Welcome current user (Sends a message to the single client)
                socket.emit('message', msgToObj('Bot', 'Welcome to the chat'));
                
                // Broadcast when a user connects (notifies everybody but the not the current client)
                socket.broadcast.emit('message', msgToObj('Bot', 'A user has joined the chat'));

                // Runs when client disconnects, notifies all clients
                socket.on('disconnect', () => {
                io.emit('message', msgToObj('Bot', 'A user has left the chat'));
            });
        });
        
            // Listen for chatMessage
            socket.on('chatMessage', msg => {
                // emits to everybody
                io.emit('message', msgToObj('USER', msg));
            })
    });
}