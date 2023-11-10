const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    }
});

UserSchema.plugin(require('mongoose-bcrypt'));
const User = mongoose.model("User", UserSchema);

module.exports = User;