const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel.js");
const validateRegisterInput = require("../validation/register")

router.post("/register", (req,res) => {

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
})
})

module.exports = router;

