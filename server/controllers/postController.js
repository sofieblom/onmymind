const User = require("../models/UserModel.js");

const getPosts = async (req, res) => {
    const user = await User.find();
    if(user) {
        console.log("WO USER")
    }

    try {
        res.status(200).json({
            data: user
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

module.exports = {getPosts}