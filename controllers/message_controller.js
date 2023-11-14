const messageUtils = require('../utils/message');


// Get Request to message dashboard.
exports.getAllMessages = async (req, res, next) => {
    try {
        const messages = await messageUtils.getAllMessagesUtil(req);
        return res.render('dashboard', {
            messages: messages,
            isAdmin: req.user.isAdmin
        })
    } catch (err) {
        next(err);
    }
}

// Post new message 

exports.submitNewMessage = async (req, res, next) => {
    try {
        const newMessage = await messageUtils.submitNewMessageUtil(req);
        res.redirect('/messages/dashboard');
    } catch (err) {
        next(err);
    }
}

// User likes message - Send back json to manipulate dom.
exports.likeMessage = async (req, res, next) => {
    try {
        const message = await messageUtils.likeMessageUtil(req);
        res.status(200);
        res.json({
            messageLikes: message.likes
        });
    } catch (err) {
        next(err);
    }
}

//
