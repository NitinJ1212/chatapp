const express = require('express');
const routers = express.Router();
const User = require('../models/user')




routers.post('/detail', async (req, res) => {
    res.status(200).send({ status: 200, data: "this is data" });
});

routers.post('/signup', async (req, res) => {
    console.log("ppppppppppppppppp", req.body);
    const { username, password, mobile, image } = req.body
    if (!username || !password || !mobile || !image) {
        res.status(400).send({ status: false, message: "All field are mendatory." })
    } else {
        try {
            const newUser = new User({
                username,
                password,
                mobile,
                image,
            });

            // Save the new user to the database
            const saved = await newUser.save();
            console.log('User saved successfully:', saved);

            if (saved) {
                res.status(201).send({ status: true, message: "You are Successfully Signup." })
            } else {
                res.status(400).send({ status: true, message: "Something went wrong." })
            }
        } catch (error) {
            console.log(error);
        }
    }
});

routers.post('/login', (req, res) => {
    res.status(200).send({ status: 200, data: "this is data" });
});


module.exports = routers;



