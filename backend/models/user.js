const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt")
const { hash } = bcrypt;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
    }, password: {
        type: String,
        required: true,
        select: false
    }, image: {
        type: String,
        required: true
    },
    socket_id: {
        type: String
    },
    login_status: {
        type: Boolean
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next();

    this.password = await hash(this.password, 10)
})

const User = mongoose.model('User', userSchema);

module.exports = User