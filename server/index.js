const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("./database");
const userRoute = require("./routes/userRoute")
// const forceAuthorize = require("./middlewares");
const passport = require("passport")
const user = require("./routes/userRoute")
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());

app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log("Tjena")
  res.send('Hello World!')
})

app.use((req,res,next) => {
  const {token} = req.cookies;

  if(token && jwt.verify(token, process.env.JWT_SECRET_KEY)){
      res.locals.loggedIn = true;
  res.locals.email = token.email;
  res.locals.userId = token.userId;
  }else{
    res.locals.loggedIn = false;
  }
  next()
})

app.use(passport.initialize());
require("./passport")(passport);
app.use("/user", userRoute);
// app.use("/posts", forceAuthorize postRoute);

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`)
})
module.exports = app;