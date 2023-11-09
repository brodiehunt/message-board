const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now,
    },
    comments: [{
        user: {
            type: String,
        },
        comment: {
            type: String,
        }

    }]
});

MessageSchema.plugin(require('mongoose-bcrypt'));
const Message = mongoose.model("User", MessageSchema);

module.exports = Message;