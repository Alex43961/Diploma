const { Schema, model } = require("mongoose");

const usersSchema = new Schema({
    userName:
    {
        type: String,
        require:true        
    },
    userSurName:
    {
        type: String,
        require:true        
    },
    userLastName:
    {
        type: String,
        require:true        
    },
    phone:
    {
        type: String,
        require:true
    },        
    password:
    {
        type: String,
        require:true
       
    },
    cart:
    {
        type: [String],

    }
},{ timestamps: true });
module.exports = usersSchema;