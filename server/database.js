const dotenv = require("dotenv");
const mongoose = require("mongoose")
const User = require("./models/UserModel")
const { seedUser } = require("./seed")


dotenv.config();
let db = process.env.CONNECTION_STRING

if (process.env.NODE_ENV === "test") {
   console.log("Test server is running")
   db = process.env.TEST_CONNECTION_STRING
 }

mongoose.set('strictQuery', true);

mongoose.connect(db, { useNewUrlParser: true }).then(() => {
  if(process.env.NODE_ENV === "test") {
    seedUser()
  }
})
  .catch((err) => {
    console.log(err)
  })
;