const express = require('express')
const app = express();
const http = require('http').Server(app)
const io = require("socket.io")(http)

const PORT = 3000;

app.use("/" , express.static(__dirname + "/public"))

http.listen(PORT , () => {
    console.log("Server Started at Port" + PORT + ".")
})