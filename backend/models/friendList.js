const mongoose = require('mongoose');

const { Schema } = mongoose;


const frientListSchema = new Schema({
    sender: {
        type: String,
        required: true
    }, receiver: {
        type: String,
        required: true
    }, block: {
        type: Boolean,
        default: false
    }, friend: {
        type: Boolean,
        default: false
    },
})

const friendList = mongoose.model('friendList', frientListSchema);

module.exports = friendList;