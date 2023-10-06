const mongoose = require("mongoose");



const DB_CONNECTION = "mongodb+srv://semen43961:RBI3V0tVD5hMSPtL@cluster0.es0okux.mongodb.net/Market?retryWrites=true&w=majority";

const connection = async () => {
    try {
        await mongoose.connect(DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("connected");
    }catch(err) {
        console.log(err);
    }
}
connection();