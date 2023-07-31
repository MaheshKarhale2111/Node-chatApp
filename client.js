
// const port = 3;
const socket = io();
// const socket = io();
console.log(location);
const form = document.getElementById("form-class");
const messageInput = document.getElementById("sendText");
const messageContainer = document.querySelector(".container");

// var sendAudio = new Audio('sounds/sendSound.mp3')
var receiveAudio = new Audio("sounds/receiveSound.mp3");

// use enter key to submit text
// document.getElementById("sendText").addEventListener("keyup", function(event) {
//     if (event.key === "Enter") {
//         console.log("Enter key pressed");
//         // Call the submitForm function to submit the form
//         submitForm();
//     }
// });

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message"); // message is class in css
  messageElement.classList.add(position); // position = left, right
  messageContainer.appendChild(messageElement);
  if (position == "left") {
    receiveAudio.play();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault(); // to stop reload
  // More often than not, you don't want to submit the form to the server but you often want to stop the form from submitting, grab those details with JS and continue.
  const message = messageInput.value;
  if (message) {
    append(`You : ${message}`, "right");
    socket.emit("send", message);
    messageInput.value = ""; // empty the text area
  } else {
    alert(`${yourName} You can't send empty message`);
  }
});

const yourName = prompt("Enter your name to join");
// console.log(yourName);
socket.emit("new-user-joined", yourName);
// this will trigger *socket.on('new-user-joined',(name)=>{* function from index.js
// and pass name parameter

socket.on("user-joined", (yourName) => {
  append(`${yourName} joined the chat`, "left");
});

socket.on("receive", (objectData) => {
  append(`${objectData.name} : ${objectData.message} `, "left");
});

socket.on("left", (userName) => {
  append(`${userName} has left the chat`, "left");
});
