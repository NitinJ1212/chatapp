const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser')
const server = http.createServer(app);
const socketIo = require('socket.io');

const user = require('./controllers/user');
const connectToDatabase = require('./models/connection');
const { errorMiddleware } = require('./middlewares/error');
const isAuthenticated = require('./middlewares/auth');
const userRoute = require('./routes/user');
const friendRoute = require('./routes/friendRoute');
const chatRoute = require('./routes/chat');
const socekConnection = require('./scoket/socketinit')


app.use(cookieParser());
app.use(express.json());

const io = socketIo(server, {
  cors: {
    origin: "*", //Adjust this in production
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

// Enable CORS
app.use(cors({
  origin: "*",//['http:localhost:3000', 'http:localhost:3001'], //Your client- side origin
  methods: ['GET', 'POST']
}));

connectToDatabase();     //DB CONNECTION CALLING

app.use('/user', userRoute);
app.use('/friend', friendRoute);

app.use('/chat', chatRoute);

app.post('/', (req, res) => {
  res.status(200).send({ status: 200, data: "this is data" });
})




//SOKET CONNECTION

socekConnection(io);



app.use(errorMiddleware)
//Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



//  server/index.js
//  const express = require('express');
//  const http = require('http');
//  const socketIo = require('socket.io');
//  const cors = require('cors');
//  const socekConnection = require('./scoket/socketinit')

//  const app = express();
//  const server = http.createServer(app);
//  const io = socketIo(server, {
//    cors: {
//      origin: "*",  Adjust this in production
//      methods: ["GET", "POST"],
//      allowedHeaders: ["Content-Type"],
//      credentials: true,
//    },
//  });

//   Middleware
//  app.use(cors());
//  app.use(express.json());

//  socekConnection(io);
//   Sample route
//  app.get('/', (req, res) => {
//    res.send('Socket.IO server is running.');
//  });

//   Socket.IO connection

//   Start the server
//  const PORT = process.env.PORT || 5000;  Adjust port as necessary
//  server.listen(PORT, () => {
//    console.log(`Server is running on port ${PORT}`);
//  });
