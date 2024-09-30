

const express = require('express');
const friend = require('../controllers/friend');
const isAuthenticated = require('../middlewares/auth');

const friendRoute = express.Router();

friendRoute.post('/list', isAuthenticated, friend.getAllFriendList)

friendRoute.post('/request', isAuthenticated, friend.sendRequest)




module.exports = friendRoute;