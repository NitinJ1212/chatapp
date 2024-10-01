const jwt = require('jsonwebtoken')

const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "lax",
    httpOnly: true,
    secure: false
}

const sendToken = (res, user, status, message) => {
    const token = jwt.sign({
        _id: user._id
    }, "process.env.JWT_SECRET")
    return res.status(status).cookie("chatapp-token", token, cookieOptions).json({
        success: true,
        token,
        message,
        user
    })
}


module.exports = {
    sendToken
}