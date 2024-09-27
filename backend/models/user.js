const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
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

const User = mongoose.model('User', userSchema);

module.exports = User