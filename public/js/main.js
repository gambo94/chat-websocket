const chatForm = document.getElementById('chat-form');



const socket = io();

// Message from server
socket.on('message', message =>{
    console.log(message); // logs in frontend console
    outputMessage(message);
});

// Message form submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); // it preventes page refresh

    // get the text from client
    let msgInput = document.getElementById('msg');
    // let msg = e.target.elements.msg.value;
    
    // Emits message to server
    socket.emit('chatMessage', msgInput.value);
    // Back to blank and autofocus
    msgInput.value ='';
})


// Output message to DOM
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}