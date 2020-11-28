console.log('hello everyone welcome')

const express = require('express')
const app = express();

const PORT = 3000;

app.use("/" , express.static(__dirname + "/public"))

app.listen(PORT , () => {
    console.log("Server Started at Port" + PORT + ".")
})