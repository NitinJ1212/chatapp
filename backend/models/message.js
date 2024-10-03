const mongoose = require('mongoose');
const { Schema, Types } = mongoose;


const messageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: Types.ObjectId,
        ref: "User"
    },
    receiver: {
        type: Types.ObjectId,
        ref: "User"
    },
    lastMessage: {
        type: String,
        required: true
    }
})


const Message = mongoose.model("Message", messageSchema);

module.exports = Message;