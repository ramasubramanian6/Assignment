const mongoose = require('mongoose');

const userObject={
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    id:{
        type: Number,
        required:true,
        unique:true
    }
}


const userSchema = new mongoose.Schema(userObject);
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;