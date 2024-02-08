const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const plm = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost:27017/ToolStore');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    tools: [ ],

    dp: {
        type: String // You can specify a data type for profile picture URLs or any other relevant type
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String
    }
});

userSchema.plugin(plm);
module.exports = mongoose.model('User', userSchema);

