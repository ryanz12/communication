const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    //do something
    
    socket.on('chat message', (data) => {
        io.emit('chat message', {name: data.name, message: data.message});
    });
    socket.on('disconnect', () => {
        //do something
    })
});
  

server.listen(3000, () => {
    console.log("Listening on port 3000*");
})

