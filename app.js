const express = require('express');
const { Socket } = require('socket.io');
const app = express();
const http = require('http').Server(app)
const io = require("socket.io")(http)

const PORT = 3000;

app.use("/" , express.static(__dirname + "/public"))

const onConnection  = socket => {
    socket.on("drawing" , data => socket.broadcast.emit("drawing" , data))
}
io.on("connection" , onConnection)

http.listen(PORT , () => {
    console.log("Server Started at Port" + PORT + ".")
})