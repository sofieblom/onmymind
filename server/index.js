const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("./database");
const userRoute = require("./routes/userRoute")
const postRoute = require("./routes/postRoute")
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
})

app.use("/user", userRoute);
app.use("/posts", postRoute);

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`)
})
module.exports = app;