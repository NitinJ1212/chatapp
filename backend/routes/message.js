const express = require('express');
const { sendMessage, getAllMessages } = require('../controllers/message');
const messageRoute = express.Router();
const isAuthenticated = require('../middlewares/auth');

// isAuthenticated();
isAuthenticated

messageRoute.post("/list", isAuthenticated, getAllMessages);

messageRoute.post("/send", isAuthenticated, sendMessage);




module.exports = messageRoute;