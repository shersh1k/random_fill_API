import * as express from "express";
import * as http from "http";
// import * as socketIo from "socket.io";

var io = require('socket.io')(http);
const app = express();

app.get('/', (req, res) => {
    console.log('________________________________________________________________' + __dirname)
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket: any) => {
    console.log('a user connected');
});

http.createServer(app).listen(4000, () => {
    console.log('listening on *:4000');
});