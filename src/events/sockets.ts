const msgToObj = require('../utils/message');
const control = require('../controller/controller');

module.exports = (io) => {

        // events
        io.on('connection', socket => {

            // Join event
            socket.on('login', async (userObj) =>{

                // check if user exist
                let user = await control.log_user(userObj);
                if(user.username !== userObj.username || user.password !== userObj.password){
                     return socket.emit('not auth', ('user and password dont correspond'))
                } 
                
                socket.emit('logged', ('authed'));

                socket.join(userObj.room);

                // load chat room

                // Welcome current user (Sends a message to the single client)
                socket.emit('message', msgToObj('Bot', 'Welcome to the chat'));
                
                // Broadcast when a user connects (notifies everybody but the not the current client)
                socket.broadcast.to(user.room).emit('message', msgToObj('Bot', `${userObj.username} has joined the chat`));

                // Runs when client disconnects, notifies all clients
                socket.on('disconnect', () => {
                io.emit('message', msgToObj('Bot', `${userObj.username} has left the chat`));
            });
        });
        
            // Listen for chatMessage
            socket.on('chatMessage', msg => {
                // emits to everybody
                io.emit('message', msgToObj('USER', msg));
            })
    });
}