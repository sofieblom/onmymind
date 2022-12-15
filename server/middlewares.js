const jwt = require("jsonwebtoken");

const forceAuthorize = (req, res, next) => {
  const {token} = req.cookies;

  if(token && jwt.verify(token, process.env.JWT_SECRET_KEY)){
      res.locals.loggedIn = true;
  res.locals.email = token.email;
  res.locals.userId = token.userId;
  }else{
    res.locals.loggedIn = false;
  }
  next()
  };
  
  module.exports = forceAuthorize;