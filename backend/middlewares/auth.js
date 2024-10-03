const { tryCatch, ErrorHnadler } = require("./error");
const jwt = require('jsonwebtoken')


const isAuthenticated = tryCatch(async (req, res, next) => {
    const token = req.cookies["chatapp-token"];
    console.log(token, "pppppp[[[[[[[[[[[[[[[[[[[[[[[[=--------------")
    if (!token) {
        return next(new ErrorHnadler("Unauthorized: No token provided", 401))
    }
    const user = await jwt.verify(token, "process.env.JWT_SECRET");
    if (user) {
        req.user = user._id
        next()
    }
})

module.exports = isAuthenticated;