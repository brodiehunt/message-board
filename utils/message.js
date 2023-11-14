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