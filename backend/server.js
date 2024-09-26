const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Your client-side origin
  methods: ['GET', 'POST']
}));

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3002', 'http://localhost:3001'], // Your client-side origin
    methods: ['GET', 'POST']
  }
});

// Socket.io connection
io.on('connection', (socket) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

  // Handle image data sent from the client (assuming it's sent as a Buffer)
  socket.on('sendImage', (imageBuffer) => {
    const fileName = `image-${Date.now()}.png`; // Assuming PNG, you can detect type if needed
    const filePath = path.join(__dirname, 'uploads', fileName);

    fs.writeFile(filePath, imageBuffer, (err) => {
      if (err) {
        console.error('Failed to save image:', err);
        socket.emit('error', 'Failed to save image');
      } else {
        console.log('Image saved at:', filePath);
        socket.emit('imageSaved', { filePath });
      }
    });
  });




  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

