const app = require('express')();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// const cors = require('cors');

let level = 0;

const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
// app.use(cors());
app.use(bodyParser.json());

const saveSocketConnection = socket => {
  const connections = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'socketConnections.json'))
  );
  const newSocket = { id: socket.id, time: socket.handshake.time };
  connections.connections.push(newSocket);
  fs.writeFileSync(
    path.join(__dirname, 'socketConnections.json'),
    JSON.stringify(connections)
  );
};

io.on('connection', socket => {
  console.log(`Nuevo socket: ${socket.id}`);
  saveSocketConnection(socket);
  socket.on('disconnect', () => {
    console.log(`Se ha desconectado ${socket.id}`);
  });
});

// console.log(io.engine);

// io.socket.on('userMessage', ({ name, message }) => {
//   console.log(io.socket);
//   // console.log(io);
//   io.emit('serverMessage', { name, message })
// })

app.post('/webhook', (req, res) => {
  const { type, ...rest } = req.body;
  if (type === 'begin') io.emit('trainBegin', 'Empieza el tren del Hype');
  if (type === 'finish')
    io.emit('trainFinish', 'Se ha acabado el tren del Hype');
  if (type === 'levelUp') {
    io.emit(`train${level + 1}Begin`, 1);
    level++;
  }
  if (type === 'progress') io.emit(`progress${level}`, 1);
  res.json('Ha empezado el tren del hype');
});

http.listen(4000, function () {
  console.log('listening on port 4000');
});
