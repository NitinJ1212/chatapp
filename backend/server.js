const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser')
const server = http.createServer(app);

const user = require('./controllers/user');
const connectToDatabase = require('./models/connection');
const { errorMiddleware } = require('./middlewares/error');
const isAuthenticated = require('./middlewares/auth');
const userRoute = require('./routes/user');

app.use(cookieParser());
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Your client-side origin
  methods: ['GET', 'POST']
}));

connectToDatabase();    // DB CONNECTION CALLING

app.use('/user', userRoute);
app.post('/', (req, res) => {
  res.status(200).send({ status: 200, data: "this is data" });
})



app.use(errorMiddleware)
// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

