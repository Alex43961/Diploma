const { Schema, model } = require("mongoose");

const productsSchema = new Schema({
    image: {
        type: String,

    },
    name: {
        type: String,

    },
    price: {
        type: Number,

    },
    description: {
        type: String,

    },
    comments: {
        type: [String]
    }
}, { timestamps: true });
module.exports = productsSchema;