// // Node server which will handle socket io connections 

// Node server which will handle socket io connections
const io = require('socket.io')(3000)

const users = {};

io.on('connection', socket =>{
    // If any new user joins, let other users connected to the server know!
    socket.on('new-user-joined', name =>{ 
        // console.log("New user joined " + name); 
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    //// events names ike new-user-joined, send, receive are custom names 
    // If someone sends a message, broadcast it to other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', (message)=>{
        socket.broadcast.emit('left', users[socket.id]) // send a broadaast with event listerner 'left' along with who has left the chat 
        delete users[socket.id];
    } )

})
//   const io has our package socket.io 
//   io.on(connection) means when it saw a connection ( a event listener) it will fire a callback fuction
//   written next to it
//   i.e. anynomous function with socket as input pararmeter will be fired 
//   socket.on(new-user-joined) ( same as event listernr when new user joined) fires a anynomous function with input parameter (name)
//    whenever a new user joined it will append user-name to 'users' list
//    it will also boradcast message user joined 
// */