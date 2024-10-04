

const express = require('express');
const user = require('../controllers/user');
const isAuthenticated = require('../middlewares/auth');

const userRoute = express.Router();

userRoute.post('/signup', user.signup)

userRoute.post('/login', user.login)

userRoute.post('/detail', isAuthenticated, user.detail)


module.exports = userRoute;