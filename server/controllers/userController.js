const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel.js");
const validateRegisterInput = require("../validation/register")
const validateLoginInput = require("../validation/login")

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
  

  // Hash password before saving
  bcrypt.genSalt(7, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then(user => res.json(user)).catch(err => console.log(err))
    })    
  })  
}
})}

const getUser = async (req, res) => {
    const user = await User.find();

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

const createUser = async (req,res) => {
    try {
        postNewUser(req,res);
    } catch(error) {
       res.status(500).json({
        message: error
       })
    }
}

const getUserById = async (req,res) => {
    try {
        const userById = await User.findById(req.params.id);

        res.status(200).json({
            message: "success",
            data: userById
        })
    }catch(error) {
        res.send(500).json({
            message: error
        })
    }
}

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
            return res.status(404).json({ emailnotfound: "Email not found" })
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {
                const payload = {
                    id: user.id,
                    email: user.email
                }
                jwt.sign(payload, process.env.secretOrKey, {
                    expiresIn: 31556926
                }, 
                (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    })
                }
                )
            }else {
                return res.status(400).json({ passwordincorrect: "Password incorrect"})
            }
        })
    })
}

module.exports = {postNewUser, getUser, createUser, getUserById, loginUser}