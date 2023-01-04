const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel.js");
const validateRegisterInput = require("../validation/register")
const validateLoginInput = require("../validation/login")

// Register user
function postNewUser(req,res) {

  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
 
  User.findOne({ email: req.body.email}).then(user => {
    if(user){
      return res.status(400).json({email: "Email aldready exist"})
    } else {
        const newUser = new User({
        firstname: req.body.firstname, 
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
        });

        //Hash password before saving
        bcrypt.genSalt(7, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => res.json({
                _id: user.id,
                email: user.email,
            })).catch(err => console.log(err))
        })    
    })  
}
})
}

// Create user
const createUser = async (req,res) => {
    try {
        postNewUser(req,res);
    } catch(error) {
       res.status(500).json({
        message: error
       })
    }
}

// Log in user
const loginUser = async (req, res) => {
    
    const {errors, isValid} = validateLoginInput(req.body);
    
    // check validation 
    if(!isValid) {
        return res.status(400).json(errors)
    }
    const email = req.body.email;
    const password = req.body.password;

    // Find user
    User.findOne({ email }).then(user => {
        if(!user){
            return res.status(404).json({ emailError: "Email not found" })
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {
                res.status(200).json({
                    _id: user._id,
                    email: user.email,
                    token: generateToken(user._id)
                })
              
            }else {
                console.log("incorrect password")
                res.status(401).json({ passwordError: "Incorrect password" })
                // throw new Error ("Invalid email or password")
            }
        })
        .catch((error) => {
            console.log(error)
        })
    })
}

// Get user
const getUser = async (req, res) => {
    const { _id, email} = await User.findById(req.user.id)
    res.status(200).json({
        id: _id, 
        email,
    })
}

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '30d', // 30 days
    })
} 


module.exports = {postNewUser, getUser, createUser, loginUser}