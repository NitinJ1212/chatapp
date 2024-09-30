const express = require('express');

const chat = require('../controllers/chat');
const isAuthenticated = require('../middlewares/auth');
const chatRoute = express.Router();


chatRoute.post("/newgroupchat", isAuthenticated, chat.newGroupChat)


module.exports = chatRoute;