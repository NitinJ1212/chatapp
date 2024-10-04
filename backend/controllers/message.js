const { ErrorHnadler, tryCatch } = require('../middlewares/error');
const messages = require('../models/message')





const sendMessage = tryCatch((req, res, next) => {
    const { message, receiver } = req.body;
    const sender = req.user;
    console.log("ddddddddddddddd")

    if (!message || !receiver) {
        return next(new ErrorHnadler("All field are mendatory.", 400))
    }
    if (!sender) {
        return next(new ErrorHnadler("User not found.", 404))
    }
    if (sender.toString() === receiver.toString()) {
        return next(new ErrorHnadler("You can not send message yourself.", 400))
    }
    const send = new messages({ message, receiver, sender, lastMessage: message });
    const save = send.save();
    if (save) {
        res.status(201).json({ status: true, message: "Message sent successfully" });
    } else {
        return next(new ErrorHnadler("Something went wrong.", 400))
    }

})


const getAllMessages = tryCatch(async (req, res, next) => {
    console.log(req.body.receiver, "[[[[[[[[[[[[")
    const { receiver } = req.body
    const user = req.user;
    if (!user) { return next(new ErrorHnadler("User not found", 404)) }
    if (!receiver) { return next(new ErrorHnadler("Friend id is missing", 400)) }

    const allMessages = await messages.find({ $or: [{ receiver: user, sender: receiver }, { receiver: receiver, sender: user }] })
    console.log(allMessages, "gettttttt-0-0-0-0-0-0-0-0-0-0-0-0-0-0");
    return res.status(200).json({ status: true, data: allMessages })
})

module.exports = { sendMessage, getAllMessages }