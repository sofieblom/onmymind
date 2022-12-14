const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModel.js");

router.post("/register", (req,res) => {
  const newUser = new userModel({
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
})

module.exports = router;

