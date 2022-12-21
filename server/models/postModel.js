const mongoose = require("mongoose");
const Schema = mongoose.Schema

const PostSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    // date: {
    //     type: Date,
    //     default: Date.now
    // },
    title: {
        type: String, 
        require: true
    }, 
    text: {
        type: String,
        require: true
    }

},
    {
        timestamps: true
    }
)

const User = mongoose.model("Post", PostSchema)
module.exports = User;