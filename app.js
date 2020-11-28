const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 3000;

app.use("/", express.static(__dirname + "/public"));

const onConnection = socket => {
  socket.on("drawing", data => socket.broadcast.emit("drawing", data));
};

io.on("connection", onConnection);

http.listen(port, () => {
  console.log("Server started in port " + port + ".");
});
