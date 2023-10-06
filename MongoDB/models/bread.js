const { Schema, model } = require("mongoose");

const breadSchema = new Schema({
    factory: {
        type: String,
        maxLength: 10,
        required: true
    },
    productionDate: {
        type: Date,
        min: getDate() - 2,
        required: true
    },
    composition: {
        type: String
    }
}, { timestamps: true });
module.exports = model("bread", breadSchema, "breads");