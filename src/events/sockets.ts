const msgToObj = require('../utils/message');
const control = require('../controller/controller');

module.exports = (io) => {


        // events
        io.on('connection', socket => {





            // New user event
            socket.on('new user', async (userObj, cb) =>{

                // creating obj from front data
                let username = userObj.username;
                let password = userObj.password;
                let room = userObj.room;

                // check if user exists in DB
                let exists = await control.user_exists(username);
                console.log('if undefined creates user',exists)

                // if user exists, front will display error
                if(exists !== undefined) return cb(false);

                // creates user and storing into DB
                cb(true);
                socket.username = username;
                await control.signup_user(username, password);
                socket.join(room);

                // get all users from db and passing them to front
                let users = await control.get_users();
                socket.emit('loadUsers', users);


                // gets all room's messages and passing them to front
                let msgs = await control.get_messages(room);
                socket.emit('conversation', msgs);
                console.log('messages from server', msgs);

                // Welcome current user (Sends a message to the single client)
                socket.emit('message', msgToObj('Bot', `Welcome to the chat, ${socket.username}`));
                
                // Broadcast when a user connects (notifies everybody but the not the current client)
                socket.broadcast.to(room).emit('message', msgToObj('Bot', `${username} has joined the chat`));


            // Listen for chatMessage
            socket.on('chatMessage', async msg => {
                // saves chat message into DB
                let result = await control.saveChatMessage(room, socket.username, msg);
                console.log('result of saving message in socket', result);
                // emits to everybody
                console.log('from chatmessage', socket.username)
                io.to(room).emit('message', msgToObj(socket.username, msg));
            })

            // Runs when client disconnects, notifies all clients
            socket.on('disconnect', (data) => {
                if(!socket.username) return;
                io.to(room).emit('message', msgToObj('Bot', `${username} has left the chat`));
            });
        });
        
    });
}