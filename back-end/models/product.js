const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
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
const Product = mongoose.model('Product', productSchema);
module.exports = Product;