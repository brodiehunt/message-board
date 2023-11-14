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
    likes: {
        type: Number,
        default: 0,
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

MessageSchema.virtual('formattedDate').get(function() {
    const year = this.create_date.getFullYear();
    const month = this.create_date.getMonth() + 1;
    const day = this.create_date.getDate();

    return `${day}/${month}/${year}`;
})

MessageSchema.plugin(require('mongoose-bcrypt'));
const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;