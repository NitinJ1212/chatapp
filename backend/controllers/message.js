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


module.exports = { sendMessage }