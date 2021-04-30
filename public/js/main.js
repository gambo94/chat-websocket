// HTML elements
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

// Get username and roomf from URL
const { username, password, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, password, room });

// Any message from server
socket.on('message', message =>{
    console.log(message); // logs in frontend console
    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message form submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); // it preventes page refresh

    // get the text from client
    let msgInput = document.getElementById('msg');
    // let msg = e.target.elements.msg.value;
    
    // Emits message to server
    socket.emit('chatMessage', msgInput.value);
    // Clear input and autofocus
    msgInput.value ='';
    msgInput.focus();
})


// Output message to DOM
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}</p>
    <p class="text">
        ${message.chat_message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}