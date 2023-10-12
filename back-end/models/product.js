const { Schema, model } = require("mongoose");

const productsSchema = new Schema({
    image: {
        type: String,
        required: true

    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments: {
        type: [String]
    }
}, { timestamps: true });
module.exports = productsSchema;