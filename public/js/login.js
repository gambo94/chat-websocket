// HTML elements
const loginForm = document.getElementById('login');
const userEl = document.getElementById('username');
const pwdEl = document.getElementById('password');
const roomEl = document.getElementById('room');
// Element for managing the error
const divError = document.getElementById('error');
const para = document.createElement("P");
const text = document.createTextNode("Username or password invalid");
para.appendChild(text);

const socket = io();

// Login form submit
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // it preventes page refresh

    // get the info from form
    let username = userEl.value;
    let password = pwdEl.value;
    let room = roomEl.value;
    // tells server to check login
    let userObj = { username, password, room }
    emit
})

// socket.on('logged', (msg) => {
//     console.log(msg);
//     window.location= 'http://localhost:3000/chat.html'
// })

// socket.on('not auth', (msg) => {
//     console.log(msg);
//     console.log('troia');
//     divError.appendChild(para);
//     username.value ='';
//     password.value = '';
//     room.value = '';
// })
