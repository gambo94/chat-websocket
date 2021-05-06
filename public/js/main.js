// HTML chat elements
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const ulUsers = document.getElementById('users');
// Main DIVs
const loginDiv = document.getElementById('login');
const chatDiv = document.getElementById('chat');

// Login form and data
const loginForm = document.getElementById('loginForm');
let username = document.getElementById('username');
let password = document.getElementById('password');
let room = document.getElementById('room');
let error = document.getElementById('error');



const socket = io();

// Login form submit
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // it prevents page refresh
    let userObject = {
        username: username.value,
        password: password.value,
        room: room.value
        
    }
    socket.emit('new user', userObject, function(data){
        if(data) {
            loginDiv.style.display = 'none';
            chatDiv.style.display = 'block';
        } else {
            error.innerHTML = 'This username already exists';
        }
        username.value = '';
        password.value = '';
    });
})

// Message form submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); // it prevents page refresh

    // get the text from client
    let msgInput = document.getElementById('msg');
    // let msg = e.target.elements.msg.value;
    
    // Emits message to server
    socket.emit('chatMessage', msgInput.value);
    // Clear input and autofocus
    msgInput.value ='';
    msgInput.focus();
})

// receives all users from server and inserts names on html
socket.on('loadUsers', users => {
    ulUsers.innerHTML = '';
    // creates li for every user existing in DB
    users.forEach(users => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(`${users.username}`));
        ulUsers.appendChild(li);
    });
})

// receiving msgs from server and loading them in fron
socket.on('conversation', msgs => {
    outputMessage(msgs);
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

// Any message from server
socket.on('message', message =>{
    console.log(message); // logs in frontend console
    outputMessage(message); 
    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});



// Output message to DOM
function outputMessage(message){
    // if message comes from DB it's an array
    if (Array.isArray(message)){
        message.forEach((msg) => {
            const div = document.createElement('div');
            div.classList.add('message');
            div.innerHTML = `<p class="meta"><b>${msg.username}</b> ${msg.message_date}</p>
            <p class="text">
                ${msg.message_content}
            </p>`;
            document.querySelector('.chat-messages').appendChild(div);
        })    
    // if it's normal
    } else {
        const div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML = `<p class="meta">${message.username}</p>
        <p class="text">
            ${message.chat_message}
        </p>`;
        document.querySelector('.chat-messages').appendChild(div);    
    }
}