const express = require('express'); //import express library
const app = express(); //instance of express

//create new http server
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    io.emit('chat message', "A user connected");
    socket.on('disconnect', ()=> {
        io.emit('chat message', "A user has disconnected");
    })
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
})

server.listen(3000, () => {
    console.log("Listening on port 3000");
})