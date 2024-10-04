const { ErrorHnadler, tryCatch } = require('../middlewares/error');
const friendList = require('../models/friendList');
const user = require('../models/user');

// helper function start

const alreadyExist = async (sender, receiver, next) => {
    const exist = await friendList.find({
        $or: [
            { sender: sender, receiver: receiver },
            { sender: receiver, receiver: sender }
        ]
    });
    return exist;
}
// helper function end 

const searchFriend = async (req, res, next) => {
    const { searcitem } = req.body;
    const sender = req.user;
    if (!searcitem) {
        return next(new ErrorHnadler("Something went wrong", 400))
    }
    // const searchUser = await user.find({ username: searcitem, mobile: searcitem })
    let query = {};
    if (isNaN) {
        query = {
            $or: [
                { username: { $regex: searcitem, $options: 'i' } }, // Corrected to $options
            ]
        }
    } else {
        query = {
            $or: [
                { username: { $regex: searcitem, $options: 'i' } }, // Corrected to $options
                { mobile: { $regex: searcitem, $options: 'i' } }   // Corrected to $options
            ]
        }
    }
    const searchUser = await user.find(query).select("username mobile ")
    if (searchUser) {
        return res.status(200).json({ status: true, data: searchUser })
    } else {
        return next(new ErrorHnadler("Something went wrong", 400))
    }
}

const getAllFriendList = tryCatch(async (req, res, next) => {
    const user_id = req.user;
    if (!user_id) {
        return next(new ErrorHnadler("User_id ID is required.", 400))
    }
    const list = await friendList.find({ $or: [{ sender: user_id }, { receiver: user_id }], $and: [{ friend: true }] }).select("sender receiver -_id")

    const receivers = list.reduce((prev, curr) => {
        if (curr.receiver !== user_id) {
            prev.push(curr.receiver)
        }
        if (curr.sender !== user_id) { prev.push(curr.sender) }
        return prev;
    }, [])

    const friendDetail = await user.find({ $and: [{ _id: { $in: receivers } }, { _id: { $ne: user_id } }] });
    if (list) {
        return res.status(200).json({ status: true, data: friendDetail });
    } else {
        return next(new ErrorHnadler("Something went wrong", 400))
    }
})

const sendRequest = tryCatch(async (req, res, next) => {

    const { receiver } = req.body;
    const sender = req.user;
    if (!receiver) { return next(new ErrorHnadler("Receiver ID is required.", 400)) }

    const request_id = await user.findById(receiver)

    if (!request_id) { return next(new ErrorHnadler("User not found.", 404)) }

    if (sender?.toString() === receiver?.toString()) { return next(new ErrorHnadler("You can not send self request.", 404)) }

    const exist = await alreadyExist(sender, receiver, next);
    if (exist?.length === 0) {
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
    } else {
        if (exist[0]["friend"]) {
            return next(new ErrorHnadler("You are Already Friend", 400))
        } if (!exist[0]["friend"]) {
            return next(new ErrorHnadler("You aready sent request.", 400))
        }
    }
})

const requestResponse = async (req, res, next) => {
    const { friend, receiver } = req.body;

    const exist = await friendList.find({ receiver: receiver });

    if (!exist) {
        return next(new ErrorHnadler("User not Exist", 404));
    }
    if (friend) {
        const update = await friendList.updateOne({ receiver }, { friend: friend })
        return res.status(200).json({ status: true, message: "Request accepted successfully" })
    } else {
        const deleted = await friendList.deleteOne({ receiver })
        return res.status(200).json({ status: true, message: "Request deleted successfully" })
    }

}

module.exports = { sendRequest, getAllFriendList, requestResponse, searchFriend }