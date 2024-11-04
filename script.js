const socket = new WebSocket("ws://localhost:3000/websocket");

socket.onopen = () => {
console.log("Connected to server");
};

socket.onmessage = (event) => {
const messagesDiv = document.getElementById("messages");
messagesDiv.innerHTML += `<p>${event.data}</p>`;
};

document.getElementById("sendButton").onclick = () => {
const input = document.getElementById("messageInput");
socket.send(input.value);
input.value = "";
};