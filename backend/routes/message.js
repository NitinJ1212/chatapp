const express = require('express');
const { sendMessage } = require('../controllers/message');
const messageRoute = express.Router();
const isAuthenticated = require('../middlewares/auth');

// isAuthenticated();
isAuthenticated

messageRoute.post("/send", isAuthenticated, sendMessage);



module.exports = messageRoute;