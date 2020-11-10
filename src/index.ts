import * as express from 'express';
import * as HTTP from 'http';
import * as cors from "cors";
import { Server, Socket } from 'socket.io';

const app = express();
const http = HTTP.createServer(app);
const io = new Server(http, { path: '/socket' });

const port = process.env.PORT || 4000;

app.use(express.static(__dirname + '/public'));

app.use(cors({ credentials: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket: Socket) => {
  socket.on('chat message', function (msg: string) {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
