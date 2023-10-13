const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    userName:
    {
        type: String
           
    },
    userSurName:
    {
        type: String
           
    },
    userLastName:
    {
        type: String
         
    },
    phone:
    {
        type: String
       
    },        
    password:
    {
        type: String
       
       
    },
    cart:
    {
        type: [String]

    }
},{ timestamps: true });
const User = mongoose.model('User', usersSchema);
module.exports = User;