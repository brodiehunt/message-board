const Message = require('../models/Message');

exports.getAllMessagesUtil = async (req) => {
        const messages = await Message.find({}).sort({create_date: -1});
        return messages;
}

exports.submitNewMessageUtil = async (req) => {
    const newMessageData = {
        title: req.body.title,
        user: req.user.username,
        content: req.body.message
    }

    const newMessage = new Message(newMessageData);
    await newMessage.save();
    return newMessage;

}

exports.likeMessageUtil = async (req, res, next) => {
    const message = await Message.findById(req.body.messageId);
    message.likes ??= 1;
    message.likes = message.likes + 1;
    await message.save();
    return message;
}