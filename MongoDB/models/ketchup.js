const { Schema, model } = require("mongoose");

const ketchupSchema = new Schema({
    mark: {
        type: String,
        minLength: 5,
        required: true
    },
    productionDate: {
        type: Date,
        required: true
    },
    numberOfStandard: {
        type: String,
        validate: {
            validator: (v) => v !== '$' && v !== '|' && v !== '/',
            message: 'The unacceptable symbol has been used'
        },
        required: true
    }
}, { timestamps: true });
module.exports = model("ketchup", ketchupSchema, "Ketchups");