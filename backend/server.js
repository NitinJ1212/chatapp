// const express = require('express');
// const { createServer } = require('node:http');
// const { join } = require('node:path');
// const { Server } = require('socket.io');

// const app = express();
// const servers = createServer(app);
// const io = new Server(servers);

// app.get('/', (req, res) => {
//     res.sendFile(join(__dirname, 'index.html'));
// });


// io.on('connection', (socket) => {
//     console.log('a user connected');
// });


// servers.listen(3000, () => {
//     console.log('server running at http://localhost:3000');
// });






const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Your client-side origin
  methods: ['GET', 'POST']
}));

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3002'], // Your client-side origin
    methods: ['GET', 'POST']
  }
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('disconnect', () => {

    console.log('user disconnected');
  });

  // Example event handling
  socket.on('message', (data) => {
    console.log('message received:', data);
    io.emit('message', { data, id: socket.id }); // Broadcast the message to all connected clients
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
