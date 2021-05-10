const msgToObj = require('../utils/message');
const control = require('../controller/controller');

module.exports = (io) => {

    let arrayForDisconnecting = [];

        // events
        io.on('connection', socket => {


            // New user event
            socket.on('new user', async (userObj, cb) =>{

                // creating obj from front data
                let username = userObj.username;
                let password = userObj.password;
                let room = userObj.room;

                // check if user and password exist in DB
                let exists = await control.user_exists(username, password);
                console.log('length', exists.length);
                if(exists.length > 0 && exists !== undefined){
                    if (exists[0].username !== username || exists[0].password !== password){
                        console.log('non corrisponde');
                        return cb(false)
                    }
                }



                // } else if (exists.length === 0){
                //     console.log('array vuoto');
                //     return cb(false)
                // }

                // if user exists, front will display error
                // console.log('if exists is undefined creates user',exists)
                // if(exists !== undefined) return cb(false);

                // creates user and storing into DB
                cb(true);
                socket.username = username;
                await control.signup_user(room, username, password);
                // creates session and storing into DB
                await control.insert_session(room, username);

                // creates room
                socket.join(room);

                // get all sessions in current room from db and passing them to front
                let users = await control.get_sessions(room);
                io.to(room).emit('loadUsers', users);


                // gets all room's messages and passing them to front
                let msgs = await control.get_messages(room);
                socket.emit('conversation', msgs);

                // Welcome current user (Sends a message to the single client)
                socket.emit('message', msgToObj('Bot', `Welcome to the chat, ${socket.username}`));
                
                // Broadcast when a user connects (notifies everybody but the not the current client)
                socket.broadcast.to(room).emit('message', msgToObj('Bot', `${username} has joined the chat`));


            // Listen for chatMessage
            socket.on('chatMessage', async msg => {
                // saves chat message into DB
                let result = await control.saveChatMessage(room, socket.username, msg);
                // emits to everybody
                io.to(room).emit('message', msgToObj(socket.username, msg));
            })

            // Runs when client disconnects, notifies all clients
            socket.on('disconnect', async (data) => {
                if(!socket.username) return;
                io.to(room).emit('message', msgToObj('Bot', `${username} has left the chat`));
                // removing user from sessions table
                await control.remove_session(username, room);
                // getting new session and passing to front
                const usersSession = await control.get_sessions(room);
                io.to(room).emit('displayDisconnect', usersSession);
            });
        });
        
    });
}