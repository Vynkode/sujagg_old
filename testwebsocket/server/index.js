const app = require('express')();
const http = require('http').createServer(app);
// const cors = require('cors');
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
// app.use(cors());

io.on('connection', socket => {
  console.log(socket);
});
// console.log(io.engine);

// io.socket.on('userMessage', ({ name, message }) => {
//   console.log(io.socket);
//   // console.log(io);
//   io.emit('serverMessage', { name, message })
// })

app.get('/webhook', (req, res) => {
  io.emit('webhook', 'hola nuevo webhook');
  res.json('hola');
});

http.listen(4000, function () {
  console.log('listening on port 4000');
});
