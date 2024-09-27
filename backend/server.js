const express = require('express');
const http = require('http');
const cors = require('cors');
const user = require('./controllers/user');
const connectToDatabase = require('./models/connection');

const app = express();
const server = http.createServer(app);
app.use(express.json());
// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Your client-side origin
  methods: ['GET', 'POST']
}));
connectToDatabase();
app.use('/user', user);
app.post('/', (req, res) => {
  res.status(200).send({ status: 200, data: "this is data" });
})

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

