const path = require('path');

const express = require('express')
var sharedsession = require("express-socket.io-session")
const bodyParser = require('body-parser')
const app = express()
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.use(bodyParser.urlencoded({ extended: true }))

// Communication with folder
app.use(express.static(path.join(__dirname, 'chart')));


app.get('/', (req, res) => {
    res.redirect('/dashboard')
})

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname + '/chart/dashboard.html'));
})

app.get('/machine', (req, res) => {
    res.sendFile(path.join(__dirname + '/chart/machine.html'));
})

app.get('/:token', (req, res) => {
    res.sendFile(path.join(__dirname + '/chart/machine.html'));
})

// Socket
io.on('connect', function(socket) {
    console.log("Socket connected")
    socket.on("disconnect", function () {
        console.log("... socket disconnected");
    })
    

})

const PORT = 5000
//Set server port
http.listen(PORT, function () {
    // console.log(`listening on *:${PORT}`);
    console.log(`http://localhost:${PORT}`)
});
