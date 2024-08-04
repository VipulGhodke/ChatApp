const socket = io("http://localhost:8000");
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('./Assets/chin_tapak_dum_dum.mp3');

const append = (message, position) =>
{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.appendChild(messageElement);
    if (position == 'left') {
        audio.play().catch(error =>
        {
            console.log("Audio play was prevented:", error);
        });
    }
}

form.addEventListener('submit', (e) =>
{
    e.preventDefault();
    const message = messageInput.value;
    append(`You:${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>
{
    append(`${name} joined the chat`, 'right')
    audio.play().catch(error =>
    {
        console.log("Audio play was prevented:", error);
    });
})
socket.on('receive', data =>
{
    append(`${data.name}:${data.message}`, 'left')
    audio.play().catch(error =>
    {
        console.log("Audio play was prevented:", error);
    });
})
socket.on('user-left', name =>
{
    append(`${name} left the chat`, 'left')
})


