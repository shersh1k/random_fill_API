import * as express from 'express';
import * as HTTP from 'http';
import { Server } from 'socket.io';

const app = express();
const http = HTTP.createServer(app);
const io = new Server(http);
const port = process.env.PORT || 4000;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
//   socket.broadcast.emit('hi');
  socket.on('chat message', function (msg: string) {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
