const { Schema, model } = require("mongoose");

const cheeseSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    technology: {
type: String,
enam: ['raw', 'purn', 'kilu']
    }
}, { timestamps: true});
module.exports = model("cheese", cheeseSchema, "Cheeses");