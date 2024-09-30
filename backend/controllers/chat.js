const { ErrorHnadler } = require("../middlewares/error");
const Chat = require("../models/chat");



const newGroupChat = (req, res, next) => {
    const { name, members } = req.body;
    console.log("ddddddddddddwwwwwwwwwwwwww", req.user)
    if (!name) { return next(new ErrorHnadler("Group Name is Required", 400)); }
    if (members && members?.length < 2) {
        return next(new ErrorHnadler("Group Chat have must at least 3 member", 400));
    }

    const allmembers = [...members, req.user]
    const groupChat = new Chat({
        name,
        members: allmembers,
        groupChat: true
    })

    const saved = groupChat.save()
    if (saved) {
        return res.status(201).json({
            status: true, message: "Group Created Successfully"
        })
    }
}


module.exports = {
    newGroupChat
}