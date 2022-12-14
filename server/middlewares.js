const jwt = require("jsonwebtoken");

const forceAuthorize = (req, res, next) => {
    const { token } = req.cookies;
  
    if (token && jwt.verify(token, process.env.JWTSECRET)) {
      jwt.decode(token, process.env.JWTSECRET);
      next();
    } else {
      res.redirect("/");
    }
  };
  
  module.exports = forceAuthorize;