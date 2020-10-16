const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userModel = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        
    },
    email:{
        type: String,
        unique: true
    },
    mobile:{
        type: Number,
        unique: true,
        minlength: 10
    },
    image:{
        type: String
    }

}, {
    timestamps: true
})

const User = mongoose.model('User', userModel);
module.exports = User;