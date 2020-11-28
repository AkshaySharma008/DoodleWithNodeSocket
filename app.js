console.log('hello everyone welcome')

const express = require('express')
const app = express();

const PORT = 3000;

app.get("/" , (req, res) => {
    res.json('hello From the Doodle App')
})

app.listen(PORT , () => {
    console.log("Server Started at Port" + PORT + ".")
})