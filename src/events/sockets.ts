module.exports = (io) => {

        // events
        io.on('connection', socket => {
        
        // Welcome current user (Sends a message to the single client)
        socket.emit('message', 'Welcome to the chattt');
        
        // Broadcast when a user connects (notifies everybody but the not the current client)
        socket.broadcast.emit('message', 'A user has joined the chat');

        // Runs when client disconnects, notifies all clients
        socket.on('disconnect', () => {
            io.emit('message', 'A user has left the chat');
        });

        // Listen for chatMessage
        socket.on('chatMessage', msg => {
            // logs it to the server
            console.log(msg);
            // emits to everybody
            io.emit('message', msg);
        })
    });
}