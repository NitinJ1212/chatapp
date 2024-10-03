const express = require('express');
const routers = express.Router();
const bcrypt = require("bcrypt");
const User = require('../models/user');
const { singleUpload } = require('../middlewares/multer');
const { sendToken } = require('../utils/features');
const { tryCatch, ErrorHnadler } = require('../middlewares/error');




// routers.post('/user-detail', 
const detail = tryCatch(async (req, res) => {
    const { _id } = req.body;
    const user = await User.findById({ _id })
    if (user) {
        res.status(200).send({ status: true, data: user });
    }
    else {
        return ErrorHnadler("User Not Exist", 404)
    }
})

// routers.post('/signup', singleUpload, 
const signup = tryCatch(async (req, res, next) => {
    const { username, password, mobile, image } = req.body
    if (!username || !password || !mobile) {
        return res.status(400).send({ status: false, message: "All field are mendatory." })
    }
    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
        return next(new ErrorHnadler("Mobile number already exists!", 400));
    }
    else {

        const newUser = new User({
            username,
            password,
            mobile,
            image: "image",
        });

        // Save the new user to the database
        const saved = await newUser.save();

        if (saved) {
            // sendToken(res, saved, 201, "User Created Successfully")
            return res.status(201).send({ status: true, message: "You are Successfully Signup." })
        } else {
            return res.status(400).send({ status: true, message: "Something went wrong." })
        }
    }
})
// routers.post('/login', 
const login = tryCatch(async (req, res, next) => {
    console.log("eeeeeeeeeeeeeeeeeeeee")
    const { mobile, password } = req.body;
    const user = await User.findOne({ mobile }).select('+password');
    if (!user) {
        return res.status(400).send({ status: false, message: "User not found" });
    }
    const correct_password = await bcrypt.compare(password, user.password);
    // const correct_password = await bcrypt.compare(password, user.password);

    if (correct_password) {
        return sendToken(res, user, 200, "User Loged in Successfully")
        // res.status(200).send({ status: true, data: user, token });
    } else {
        return next(new ErrorHnadler("Incorrect Password", 400))
        //return res.status(400).send({ status: false, message: "Incorrect password" });
    }
})


module.exports = {
    signup,
    login,
    detail
};



