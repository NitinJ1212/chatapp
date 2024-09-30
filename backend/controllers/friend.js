const { ErrorHnadler, tryCatch } = require('../middlewares/error');
const friendList = require('../models/friendList');
const user = require('../models/user');


const alreadyExist = tryCatch(async (sender, receiver, next) => {
    const exist = await friendList.find({
        $or: [
            { sender: sender, receiver: receiver },
            { sender: receiver, receiver: sender },
        ]
    })
    console.log(exist, "existttttttttt t99999999999", sender, receiver);
    if (!exist) {
        return true
    }
    if (exist[0]["friend"]) {
        return next(new ErrorHnadler("You are Already Friend", 400))
    } if (!exist[0]["friend"]) {
        return next(new ErrorHnadler("You aready sent request.", 400))
    }
})


const getAllFriendList = tryCatch(async (req, res, next) => {
    const sender = req.user;
    if (!sender) {
        return next(new ErrorHnadler("User ID is required.", 400))
    }
    const list = await friendList.find({
        $or: [
            { sender: sender },
            { receiver: sender }
        ], $and: [
            { friend: true }]
    })
    if (list) {
        return res.status(200).json({ status: true, data: list });
    } else {
        return next(new ErrorHnadler("Something went wrong", 400))
    }
})



const sendRequest = tryCatch(async (req, res, next) => {
    const { receiver } = req.body;
    const sender = req.user;
    if (!receiver) {
        return next(new ErrorHnadler("Receiver ID is required.", 400))
    }
    const request_id = await user.findById(receiver)
    if (!request_id) {
        return next(new ErrorHnadler("User not found.", 404))
    }
    if (sender?.toString() === receiver?.toString()) {
        return next(new ErrorHnadler("You can not send self request.", 404))
    }
    alreadyExist(sender, receiver, next)

    const data = new friendList({
        sender,
        receiver
    });
    const saved = await data.save();

    if (saved) {
        return res.status(200).json({ status: true, message: "Request send successfully." });
    } else {
        return next(new ErrorHnadler("Something went wrong", 400))
    }
})


module.exports = { sendRequest, getAllFriendList }