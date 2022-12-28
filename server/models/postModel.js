const mongoose = require("mongoose");
const Schema = mongoose.Schema

const PostSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    title: {
        type: String, 
        require: true
    }, 
    content: {
        type: String,
        require: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }

},
    // {
    //     timestamps: true
    // }
)

const User = mongoose.model("Post", PostSchema)
module.exports = User;