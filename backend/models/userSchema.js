const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imgPath:{
        type:String,
        required:true
    },
    date:{
        type:Date
    }
});

const User = new mongoose.model("User",userSchema);

module.exports = User;