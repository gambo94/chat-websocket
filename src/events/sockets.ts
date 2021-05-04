const msgToObj = require('../utils/message');
const control = require('../controller/controller');

module.exports = (io) => {


        // events
        io.on('connection', socket => {

            // Join event
            socket.on('new user', async (userObj, cb) =>{

                // check if user exist
                let username = userObj.username;
                let password = userObj.password;
                let room = userObj.room;
                let exists = await control.user_exists(username);
                console.log('if undefined creates user',exists)
                if(exists !== undefined) return cb(false);
                cb(true);
                socket.username = username;
                // create user
                await control.signup_user(username, password);

                // get all users from db and loading them in front
                let users = await control.get_users();
                io.sockets.emit('loadUsers', users)

                // load chat room

                // Welcome current user (Sends a message to the single client)
                socket.emit('message', msgToObj('Bot', 'Welcome to the chat'));
                
                // Broadcast when a user connects (notifies everybody but the not the current client)
                socket.broadcast.emit('message', msgToObj('Bot', `${username} has joined the chat`));

                // Runs when client disconnects, notifies all clients
            socket.on('disconnect', (data) => {
                if(!socket.username) return;
                io.emit('message', msgToObj('Bot', `${username} has left the chat`));
            });
        });
        
            // Listen for chatMessage
            socket.on('chatMessage', msg => {
                // emits to everybody
                io.emit('message', msgToObj('USER', msg));
            })
    });
}