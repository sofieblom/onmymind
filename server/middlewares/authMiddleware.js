const jwt = require("jsonwebtoken")
const User = require("../models/UserModel.js")

const protect = async (req,res,next) => {
    const token = req.headers['x-api-token'];

    try{
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        // get user from the token
        req.user = await User.findById(decoded.id).select('-password')

        next()

    }catch(error){
        console.log(error)
        res.sendStatus(401)
    }
}

module.exports = {protect}