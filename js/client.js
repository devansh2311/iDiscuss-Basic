// to connect client with server
// script src="http://localhost:8000/socket.io/socket.io.js" index.html main likh diya

const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

var audio = new Audio('ting.mp3');
 
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

// Ask new user for his/her name and let the server know
const Name = prompt("Enter your name to join");
socket.emit('new-user-joined', Name); 

// If a new user joins, receive the event from the server
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right');
})

// If server sends a msg, receive it
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left');
});

// when user leaves chat, append the info to the container
socket.on('leave', name =>{
    append(`${name} left the chat`, 'left');
});

// if the form gets submitted, send server the msg
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});