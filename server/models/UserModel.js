const mongoose = require("mongoose");
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstname: {
        type: String, 
        require: true
    }, 
    lastname: {
        type: String,
        require: true
    }, 
    email: {
        type: String, 
        lowercase: true,
        require: true
    }, 
    password: {
        type: String,
        require: true
    }
})

const User = mongoose.model("User", UserSchema)
module.exports = User;