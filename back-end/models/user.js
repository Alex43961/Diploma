const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    userName:
    {
        type: String

    },
    email:
    {
        type: String,
        require: true
    },
    password:
    {
        type: String,
        require: true
    },
    cart:
    {
        type: [String]

    },
    wishItems:
    {
        type: [String]
    },

}, { timestamps: true });
const User = mongoose.model('User', usersSchema);
module.exports = User;