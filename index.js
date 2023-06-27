const { friendRouter } = require('./router/friendRouter');
const { userRouter } = require('./router/userRouter');
const { connection } = require('./db');


const express = require('express');
var cookieParser = require('cookie-parser');
const app = express();
const http = require('http');
const cors = require('cors');
const socketIO = require("socket.io");
const { globeRouter } = require('./router/globeRouter');
const { massageRouter } = require('./router/massageRouter');
app.use(cors());
app.use(express.json());
app.use(cookieParser())

const server=http.createServer(app)
const io = socketIO(server);


app.use('/users', userRouter);
app.use('/friend',friendRouter)
app.use('/globe',globeRouter)
app.use('/massages',massageRouter)


app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming messages
  socket.on('chat message', (message) => {
    console.log('Received message:', message);

    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(8690, async () => {
  try {
    await connection;
    console.log('running at port 8690...');
  } catch (err) {
    console.log(err);
  }
});
